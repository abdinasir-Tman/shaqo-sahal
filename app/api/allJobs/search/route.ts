import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const query = await req.json();
  console.log(query);
  try {
    const jobLists = await prisma.jobListing.findMany({
      select: {
        title: true,
        description: true,
        salary: true,
        id: true,
        jobCategory: true,
        workType: true,
        location: true,

        created: true,
        Employer: {
          select: {
            logo: true,
            email: true,
            companyName: true,
          },
        },
      },
      where: {
        title: {
          contains: query.title,
          mode: "insensitive",
        },
      },
    });
    console.log(jobLists);
    return NextResponse.json(jobLists, { status: 200 });
  } catch (error) {
    console.log("error at get job", error);
  }
};
