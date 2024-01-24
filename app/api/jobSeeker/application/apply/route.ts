import rejectionEmail from "@/app/utils/emails/rejectemail";
import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { searchParams }: any) => {
  const body = await req.json();

  const session: any = await getToken();

  if (!session) return NextResponse.json("not authenticated", { status: 500 });
  if (body.admited == "rejected") {
    const application = await prisma.application.findFirst({
      where: {
        id: body.appId,
      },
      select: {
        JobSeeker: {
          select: {
            email: true,
          },
        },
      },
    });
    rejectionEmail(
      session?.user.email,
      application?.JobSeeker?.email!,
      body.note
    );
    return NextResponse.json(application, { status: 202 });
  }
  try {
    const updatedApp = await prisma?.application.update({
      where: {
        id: body.appId,
      },
      data: {
        admited: body.admited,
      },
    });

    if (updatedApp) return NextResponse.json(updatedApp, { status: 202 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 501 });
  }
};
