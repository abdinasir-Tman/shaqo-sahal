import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const session: any = (await getToken()) || null;

  try {
    let jobLists;
    if (!session) {
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
      if (session.user.type == "jobSeeker") {
        const usr = await prisma.jobSeeker.findFirst({
          where: {
            email: session.user.email,
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
