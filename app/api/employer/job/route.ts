import receivedjobemail from "@/app/utils/emails/receivedjobemail";
import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { user }: any = await getToken();
  try {
    const employer = await prisma.employer.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!employer) return NextResponse.json("this email is not exist");

    const jobList = await prisma?.jobListing.create({
      data: {
        title: body.title,
        description: body.description,
        salary: body.salary,
        jobCategory: body.jobCategory,
        employerId: employer.id,
        workType: body.workType,
        location: body.location,
        deadline: body.deadline,
        salaryType: body.salaryType,
        requirements: body.requirements,
      },
    });
    const jobSeekers = await prisma.jobSeeker.findMany({
      where: {
        jobCategory: {
          has: jobList?.jobCategory,
        },
      },
    });

    jobSeekers.map((jobSeeker: any) => {
      let note = {
        jobSeeker: jobSeeker.name,
        jobTitle: jobList.title,
        companyName: employer?.companyName,
        description: jobList.description,
        location: jobList.location,
        jobId: jobList.id,
      };
      receivedjobemail(employer.email, jobSeeker?.email, note);
    });
    return NextResponse.json(jobList, { status: 201 });
  } catch (error) {
    console.log("error at register job ", error);
    return NextResponse.json("unkown error", { status: 500 });
  }
};
export const GET = async (req: NextRequest) => {
  const session: any = await getToken();

  if (!session.user)
    return NextResponse.json("please sign the page", { status: 501 });
  const employer = await prisma?.employer.findFirst({
    where: {
      email: session.user.email,
    },
  });
  try {
    const jobLists: any = await prisma.jobListing.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        salary: true,

        salaryType: true,
        requirements: true,
        jobCategory: true,
        location: true,
        workType: true,

        created: true,
      },
      where: {
        employerId: employer?.id,
      },
      orderBy: {
        created: "desc",
      },
    });

    return NextResponse.json(jobLists, { status: 200 });
  } catch (error) {
    console.log("error at get job", error);
  }
};
