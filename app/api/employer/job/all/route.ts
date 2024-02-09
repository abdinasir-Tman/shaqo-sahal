import receivedjobemail from "@/app/utils/emails/receivedjobemail";
import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
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
    const latestJobs = await prisma?.jobListing.findMany({
      include: {
        Employer: {
          select: {
            companyName: true,
          },
        },
      },
      where: {
        status: {
          not: "declined",
        },
      },
      orderBy: {
        created: "desc",
      },
    });

    console.log("latrest jobs", latestJobs);

    return NextResponse.json(latestJobs, { status: 200 });
  } catch (error) {
    console.log("error at get latestjobs", error);
    return NextResponse.json("Error at all jobs", { status: 400 });
  }
}
