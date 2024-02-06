import sendInterviewEmail from "@/app/utils/emails/interviewtimemail";
import rejectionEmail from "@/app/utils/emails/rejectemail";
import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session: any = await getToken();

  try {
    const body = await req.json();
    if (body) {
      const updatedMeeting = await prisma.meeting.update({
        where: {
          id: params.id,
        },
        data: {
          status: "canceled",
        },
      });
      const meeting = await prisma.meeting.findFirst({
        where: { id: params.id },
        select: {
          Application: {
            select: {
              JobListing: {
                select: {
                  Employer: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
              JobSeeker: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });
      if (session.user.type == "jobSeeker") {
        rejectionEmail(
          session?.user?.email,
          meeting?.Application?.JobListing?.Employer?.email!,
          body.note
        );
      } else {
        rejectionEmail(
          session?.user?.email,
          meeting?.Application?.JobSeeker?.email!,
          body.note
        );
      }
      return NextResponse.json(updatedMeeting, { status: 200 });
    } else {
      const updateMeeting = await prisma.meeting.update({
        where: {
          id: params.id,
        },
        data: {
          status: "completed",
        },
      });
      // if (updateMeeting) {
      //   const meeting = {
      //     type: updateMeeting.type,
      //     date: new Date(updateMeeting.Date).toDateString(),
      //     time: updateMeeting.time,
      //     timeDuration: updateMeeting.timeDuration,
      //     note: updateMeeting.note,
      //   };
      //   const meetings = await prisma.meeting.findFirst({
      //     where: {
      //       id: updateMeeting.id,
      //     },
      //     select: {
      //       Application: {
      //         select: {
      //           JobSeeker: {
      //             select: {
      //               email: true,
      //             },
      //           },
      //           JobListing: {
      //             select: {
      //               Employer: {
      //                 select: {
      //                   email: true,
      //                 },
      //               },
      //             },
      //           },
      //         },
      //       },
      //     },
      //   });

      //   sendInterviewEmail(
      //     meetings?.Application?.JobListing?.Employer?.email!,
      //     meetings?.Application?.JobSeeker?.email!,
      //     meeting
      //   );
      // }
      return NextResponse.json(updateMeeting, { status: 200 });
    }
  } catch (error) {
    console.log("error at update job", error);
  }
};
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();

  try {
    const updateMeeting = await prisma.meeting.update({
      where: {
        id: params.id,
      },
      data: {
        type: body.type,
        Date: body.date,
        time: body.time,
        timeDuration: body.timeDuration,
        note: body.note,
        applicationId: body.appId,
      },
    });
    if (updateMeeting) {
      const meetings = await prisma.meeting.findFirst({
        where: {
          id: updateMeeting.id,
        },
        select: {
          Application: {
            select: {
              JobSeeker: {
                select: {
                  email: true,
                  name: true,
                },
              },
              JobListing: {
                select: {
                  title: true,
                  Employer: {
                    select: {
                      email: true,
                      address: true,
                      companyName: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      const meeting = {
        type: updateMeeting.type,
        date: new Date(updateMeeting.Date).toDateString(),
        time: updateMeeting.time,
        timeDuration: updateMeeting.timeDuration,
        note: updateMeeting.note,
        jobSeeker: meetings?.Application?.JobSeeker?.name,
        address: meetings?.Application?.JobListing?.Employer?.address,
        companyName: meetings?.Application?.JobListing?.Employer?.companyName,
        jobTitle: meetings?.Application?.JobListing?.title,
      };
      sendInterviewEmail(
        meetings?.Application?.JobListing?.Employer?.email!,
        meetings?.Application?.JobSeeker?.email!,
        meeting
      );
    }
    return NextResponse.json(updateMeeting, { status: 200 });
  } catch (error) {
    console.log("error at update job", error);
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const deletedMeeting = await prisma.meeting.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(deletedMeeting, { status: 200 });
  } catch (error) {
    console.log("error at update job", error);
  }
};
