import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";
//registeration

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const employer = await prisma.employer.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!employer) return NextResponse.json("this emaile is not exist");
    const jobList = await prisma?.jobListing.create({
      data: {
        title: body.title,
        description: body.description,
        salary: body.salary,
        employerId: employer.id,
      },
    });

    return NextResponse.json(jobList, { status: 201 });
  } catch (error) {
    console.log("error at register job ", error);
    return NextResponse.json("unkown error", { status: 500 });
  }
};
export const GET = async (req: NextRequest) => {
  try {
    const jobLists = await prisma.jobListing.findMany();
    return NextResponse.json(jobLists, { status: 200 });
  } catch (error) {
    console.log("error at get job");
  }
};
