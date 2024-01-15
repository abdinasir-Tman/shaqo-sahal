import sendApplicationEmail from "@/app/utils/emails/applicationemail";
import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: any = await req.json();

  const { user }: any = await getToken();

  if (!user) return NextResponse.json("not authenticated", { status: 500 });
  const usr = await prisma.jobSeeker.findFirst({
    where: {
      email: user?.email,
    },
  });
  try {
    const existRequest = await prisma?.application.findFirst({
      where: {
        jobSeekerId: usr?.id,
        jobListingId: body.jobId,
      },
    });

    if (existRequest)
      return NextResponse.json("You already applied this job", { status: 500 });
    const newApplication = await prisma?.application.create({
      data: {
        coverLetter: body.coverLetter,
        linkedIn: body.linkedIn,
        portfolio: body.portfolio,
        resume: body.resume,
        jobSeekerId: usr?.id,
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

      await sendApplicationEmail(job?.Employer?.email!, user?.email);
    }
    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 501 });
  }
};
