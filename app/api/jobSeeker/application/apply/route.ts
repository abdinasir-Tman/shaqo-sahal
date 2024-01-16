import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { searchParams }: any) => {
  const body = await req.json();

  const session: any = await getToken();

  if (!session) return NextResponse.json("not authenticated", { status: 500 });
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
