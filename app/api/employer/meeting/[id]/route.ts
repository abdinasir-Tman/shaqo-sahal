import sendInterviewEmail from "@/app/utils/emails/interviewtimemail";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
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
      const meeting = {
        type: updateMeeting.type,
        date: new Date(updateMeeting.Date).toDateString(),
        time: updateMeeting.time,
        timeDuration: updateMeeting.timeDuration,
        note: updateMeeting.note,
      };
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
