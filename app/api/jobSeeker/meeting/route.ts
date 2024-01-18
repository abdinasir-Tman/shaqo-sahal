import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session: any = await getToken();
  if (!session) return NextResponse.json("please login first", { status: 501 });
  try {
    const meetings: any = await prisma.meeting.findMany({
      orderBy: {
        created: "desc",
      },
      include: {
        Application: {
          include: {
            JobListing: {
              include: {
                Employer: true,
              },
            },
            JobSeeker: {
              where: {
                email: session.user?.email,
              },
            },
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
