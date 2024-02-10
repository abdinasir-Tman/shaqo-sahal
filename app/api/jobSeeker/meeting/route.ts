import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
          JobSeeker: {
            email: session?.user?.email,
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
    return NextResponse.json("unknown error");
  }
};
