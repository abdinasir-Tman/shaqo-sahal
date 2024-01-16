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
      },
    });
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

    NextResponse.json(meetings, { status: 200 });
  } catch (error) {
    console.log("error at get the meetings", error);
  }
};
