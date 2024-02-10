import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  const session: any = await getToken();
  let query: any = {};
  req.nextUrl.searchParams.forEach((value, key) => {
    query.val = value;
  });

  // decline jobs expired
  await prisma.jobListing.updateMany({
    where: {
      deadline: {
        lte: new Date(),
      },
      status: {
        not: "declined",
      },
    },
    data: {
      status: "declined",
    },
  });
  try {
    let jobLists: any;
    if (!session) {
      if (Object.keys(query).length === 0) {
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
            status: {
              not: "declined",
            },
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
          where: {
            status: {
              not: "declined",
            },
            OR: [
              {
                title: {
                  contains: query?.val,
                  mode: "insensitive",
                },
              },
              {
                location: {
                  contains: query?.val,
                  mode: "insensitive",
                },
              },
            ],
          },
        });
      }
    } else {
      if (session?.user?.type == "jobSeeker") {
        const usr = await prisma.jobSeeker.findFirst({
          where: {
            email: session.user?.email,
          },
        });
        if (Object.keys(query).length === 0) {
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
              status: {
                not: "declined",
              },
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
            where: {
              jobCategory: { in: usr?.jobCategory },
              status: {
                not: "declined",
              },
              OR: [
                {
                  title: {
                    contains: query?.val,
                    mode: "insensitive",
                  },
                },
                {
                  location: {
                    contains: query?.val,
                    mode: "insensitive",
                  },
                },
              ],
            },
          });
        }
      } else {
        if (Object.keys(query).length === 0) {
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
              status: {
                not: "declined",
              },
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
            where: {
              status: {
                not: "declined",
              },
              OR: [
                {
                  title: {
                    contains: query?.val,
                    mode: "insensitive",
                  },
                },
                {
                  location: {
                    contains: query?.val,
                    mode: "insensitive",
                  },
                },
              ],
            },
          });
        }
      }
    }

    return NextResponse.json(jobLists, { status: 200 });
  } catch (error) {
    console.log("error at get alljobs", error);
  }
};
