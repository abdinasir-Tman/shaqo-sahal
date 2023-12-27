import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const jobId: any = req.url.search("jobId");
  console.log(jobId);
  const { user }: any = await getToken();
  console.log(user);
  if (!user) return NextResponse.json("not authenticated", { status: 500 });
  try {
    const updatedApp = await prisma?.application.update({
      where: {
        id: jobId,
      },
      data: {
        status: "interview",
      },
    });

    if (updatedApp)
      return NextResponse.redirect(new URL("/dashboard/applications", req.url));
  } catch (error) {
    return NextResponse.json("error", { status: 501 });
  }
};
