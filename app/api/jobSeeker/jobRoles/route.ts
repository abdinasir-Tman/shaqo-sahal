import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session: any = await getToken();
  if (!session.user)
    return NextResponse.json("not authenticated", { status: 500 });
  try {
    const jobRoles = await prisma?.jobRoles.findMany({
      include: {
        roleCategory: true,
      },
    });
    if (!jobRoles) return NextResponse.json("error", { status: 500 });

    return NextResponse.json(jobRoles, { status: 201 });
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
