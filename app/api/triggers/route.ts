import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: any = await req.json();

  try {
    // decline jobs expired
    await prisma.jobListing.updateMany({
      where: {
        deadline: {
          lte: new Date(),
        },
        status: {
          not: "declined",
        },
      },
      data: {
        status: "declined",
      },
    });
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
  } catch (error: any) {
    // The .code property can be accessed in a type-safe manner
    if (error.code === "P2002") {
      return NextResponse.json(
        "Already exists this email please use another email",
        { status: 400 }
      );
    } else {
      return NextResponse.json("unkown error", { status: 500 });
    }
  }
};
