import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { searchParams }: any) => {
  const { appId }: any = searchParams;
  console.log(appId);
  const session: any = await getToken();
  console.log(session);
  if (!session) return NextResponse.json("not authenticated", { status: 500 });
  try {
    const updatedApp = await prisma?.application.update({
      where: {
        id: appId,
      },
      data: {
        admited: true,
      },
    });

    if (updatedApp) return NextResponse.json(updatedApp, { status: 202 });
  } catch (error) {
    return NextResponse.json("error", { status: 501 });
  }
};
