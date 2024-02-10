import sendApplicationEmail from "@/app/utils/emails/applicationemail";
import sendAppliedJobemail from "@/app/utils/emails/appliedJobemail";
import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: any = await req.json();

  const session: any = await getToken();

  if (!session) return NextResponse.json("not authenticated", { status: 500 });
  const usr = await prisma.jobSeeker.findFirst({
    where: {
      email: session.user?.email,
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
      const jobSeeker = await prisma?.jobSeeker.findFirst({
        where: {
          email: session.user?.email,
        },
      });
      const app = {
        jobSeeker: jobSeeker?.name,
        jobTitle: job?.title,
        companyName: job?.Employer?.companyName,
        address: job?.Employer?.address,
        email: session?.user?.email,
        coverLetter: body.coverLetter,
        jobId: body.jobId,
      };
      await sendApplicationEmail(
        job?.Employer?.email!,
        session?.user?.email,
        app
      );
      await sendAppliedJobemail(
        session?.user?.email,
        job?.Employer?.email!,
        app
      );
    }
    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 501 });
  }
};
