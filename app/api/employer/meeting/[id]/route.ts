import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();

  try {
    const meeting = await prisma.meeting.update({
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

    return NextResponse.json(meeting, { status: 200 });
  } catch (error) {
    console.log("error at update job", error);
  }
};
