import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { user }: any = await getToken();
    let jobLists;
    if (!user) {
      jobLists = await prisma.jobListing.findMany({
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
        orderBy: {
          created: "desc",
        },
      });
    } else {
      if (user.type == "jobSeeker") {
        const usr = await prisma.jobSeeker.findFirst({
          where: {
            email: user.email,
          },
        });
        jobLists = await prisma.jobListing.findMany({
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
          orderBy: {
            created: "desc",
          },
          where: {
            jobCategory: { in: usr?.jobCategory },
          },
        });
      } else {
        jobLists = await prisma.jobListing.findMany({
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
          orderBy: {
            created: "desc",
          },
        });
      }
    }

    return NextResponse.json(jobLists, { status: 200 });
  } catch (error) {
    console.log("error at get job", error);
  }
};
