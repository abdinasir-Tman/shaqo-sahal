import approvedEmail from "@/app/utils/emails/approvedemail";
import rejectionEmail from "@/app/utils/emails/rejectemail";
import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";
interface NoteJobApproved {
  jobTitle: string;
  companyName: string;
  jobSeeker: string;
}
export const POST = async (req: NextRequest, { searchParams }: any) => {
  const body = await req.json();

  const session: any = await getToken();
  let application: any;
  if (!session) return NextResponse.json("not authenticated", { status: 500 });

  try {
    if (body.admited == "rejected") {
      let application: any = await prisma.application.findFirst({
        where: {
          id: body.appId,
        },
        select: {
          JobSeeker: {
            select: {
              email: true,
            },
          },
        },
      });
      const updatedApp = await prisma?.application.update({
        where: {
          id: body.appId,
        },
        data: {
          admited: body.admited,
        },
      });
      await rejectionEmail(
        session?.user.email,
        application?.JobSeeker?.email!,
        body.note,
        "Job Rejection"
      );
      if (updatedApp) return NextResponse.json(updatedApp, { status: 202 });
    } else {
      //if it is not reject
      const updatedApp = await prisma?.application.update({
        where: {
          id: body.appId,
        },
        data: {
          admited: body.admited,
        },
      });
      let application: any = await prisma.application.findFirst({
        where: {
          id: body.appId,
        },
        select: {
          JobSeeker: {
            select: {
              email: true,
              name: true,
            },
          },
          JobListing: {
            select: {
              title: true,
              Employer: {
                select: {
                  companyName: true,
                },
              },
            },
          },
        },
      });

      const note: NoteJobApproved = {
        companyName: application?.JobListing?.Employer?.companyName,
        jobSeeker: application?.JobSeeker?.name,
        jobTitle: application?.JobListing?.title,
      };
      await approvedEmail(
        session?.user?.email,
        application?.JobSeeker?.email!,
        note
      );
      if (updatedApp) return NextResponse.json(updatedApp, { status: 202 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 501 });
  }
};
