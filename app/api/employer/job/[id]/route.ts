import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const deletedJob = await prisma.jobListing.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(deletedJob, { status: 200 });
  } catch (error) {
    console.log("error at update job", error);
  }
};
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();

  try {
    const jobLists = await prisma.jobListing.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        description: body.description,
        salary: body.salary,
      },
    });

    return NextResponse.json(jobLists, { status: 200 });
  } catch (error) {
    console.log("error at update job", error);
  }
};
