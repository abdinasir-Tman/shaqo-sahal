import sendInterviewEmail from "@/app/utils/emails/interviewtimemail";
import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
      const meeting = {
        type: newMeeting.type,
        date: new Date(newMeeting.Date).toDateString(),
        time: newMeeting.time,
        timeDuration: newMeeting.timeDuration,
        note: newMeeting.note,
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

      sendInterviewEmail(
        meetings?.Application?.JobListing?.Employer?.email!,
        meetings?.Application?.JobSeeker?.email!,
        meeting
      );
    }
    return NextResponse.json(newMeeting, { status: 201 });
  } catch (error) {
    console.log("error at register employer ", error);
    return NextResponse.json("unkown error", { status: 500 });
  }
};
export const GET = async (req: NextRequest) => {
  const session: any = await getToken();
  if (!session) return NextResponse.json("please login first", { status: 501 });
  try {
    const meetings = await prisma.meeting.findMany({
      include: {
        Application: {
          include: {
            JobListing: true,
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
