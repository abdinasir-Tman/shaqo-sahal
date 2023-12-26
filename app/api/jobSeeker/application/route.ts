import sendApplicationEmail from "@/app/utils/email";
import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: any = await req.json();
  console.log(body);
  const { user }: any = await getToken();
  console.log(user);
  if (!user) return NextResponse.json("not authenticated", { status: 500 });
  try {
    const existRequest = await prisma?.application.findFirst({
      where: {
        jobSeekerId: user?.id,
      },
      include: {
        JobListing: {
          where: {
            id: body.jobId,
          },
        },
      },
    });

    if (existRequest)
      return NextResponse.json("You already applied this job", { status: 500 });
    const newApplication = await prisma?.application.create({
      data: {
        coverLetter: body.coverLetter,
        jobSeekerId: user?.id,
        jobListingId: body.jobId,
      },
    });
    if (newApplication) {
      const job = await prisma?.jobListing.findFirst({
        where: {
          id: body.jobId,
        },
        include: {
          Employer: true,
        },
      });
      await sendApplicationEmail(
        user?.email,
        job?.Employer?.email!,
        body.coverLetter + " \n" + job?.title
      );
    }
    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    return NextResponse.json("error", { status: 501 });
  }
};
