import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";

import { NextResponse } from "next/server";

export const GET = async () => {
  // const session: any = await getToken();

  // if (!session.user)
  //   return NextResponse.json("please sign the page", { status: 501 });

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
          },
        },
      },
    });
    console.log(jobLists);
    return NextResponse.json(jobLists, { status: 200 });
  } catch (error) {
    console.log("error at get job", error);
  }
};
