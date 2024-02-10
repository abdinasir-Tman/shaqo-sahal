import sendInterviewEmail from "@/app/utils/emails/interviewtimemail";
import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const newMeeting = await prisma.meeting.create({
      data: {
        type: body.type,
        Date: body.date,
        time: body.time,
        timeDuration: body.timeDuration,
        note: body.note,
        applicationId: body.appId,
        status: "waiting",
      },
    });
    if (newMeeting) {
      const app: any = await prisma.jobListing.findFirst({
        where: {
          applications: { some: { id: newMeeting.applicationId! } },
        },
        include: {
          applications: {
            include: {
              JobSeeker: true,
            },
          },
          Employer: true,
        },
      });

      await prisma.application.update({
        data: {
          admited: "meeting",
        },
        where: {
          id: app?.applications[0].id,
        },
      });
      await prisma.jobListing.update({
        where: {
          id: app?.id,
        },
        data: {
          status: "interview",
        },
      });

      const meeting = {
        type: newMeeting.type,
        date: new Date(newMeeting.Date).toDateString(),
        time: newMeeting.time,
        timeDuration: newMeeting.timeDuration,
        note: newMeeting.note,
        jobSeeker: app?.applications[0].JobSeeker.name,
        address: app?.Employer.address,
        companyName: app?.Employer.companyName,
        jobTitle: app?.title,
      };
      const meetings = await prisma.meeting.findFirst({
        where: {
          id: newMeeting.id,
        },
        select: {
          Application: {
            select: {
              JobSeeker: {
                select: {
                  email: true,
                },
              },
              JobListing: {
                select: {
                  Employer: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      await sendInterviewEmail(
        meetings?.Application?.JobListing?.Employer?.email!,
        meetings?.Application?.JobSeeker?.email!,
        meeting
      );
    }
    return NextResponse.json(newMeeting, { status: 201 });
  } catch (error) {
    console.log("error at register meeting ", error);
    return NextResponse.json("unkown error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  const session: any = await getToken();
  if (!session) return NextResponse.json("please login first", { status: 501 });
  try {
    //expire meetings that not have
    await prisma.meeting.updateMany({
      where: {
        Date: {
          lte: new Date(),
        },
        status: "waiting",
      },
      data: {
        status: "expired",
      },
    });

    const meetings = await prisma.meeting.findMany({
      orderBy: {
        created: "desc",
      },
      where: {
        Application: {
          JobListing: {
            Employer: {
              email: session.user.email,
            },
          },
        },
      },
      include: {
        Application: {
          include: {
            JobListing: {
              include: {
                Employer: true,
              },
            },
            JobSeeker: true,
          },
        },
      },
    });

    return NextResponse.json(meetings, { status: 200 });
  } catch (error) {
    console.log("error at get the meetings", error);
  }
};
