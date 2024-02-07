import { getToken } from "@/app/utils/token";
import React from "react";
import prisma from "@/prisma/client";
import ApplicationItems from "../_components/ApplicationItems";
import { FaDatabase } from "react-icons/fa";
import EmptyDataComponent from "@/app/components/EmptyComponent";

const Application = async ({ params }: { params: { status: string } }) => {
  let data: any;
  const session: any = await getToken();
  try {
    if (params.status == "all") {
      data = await prisma.employer.findUnique({
        where: {
          email: session.user.email,
        },
        include: {
          jobListings: {
            orderBy: {
              created: "desc",
            },
            include: {
              applications: true,
            },
          },
        },
      });
    } else {
      data = await prisma.employer.findUnique({
        where: {
          email: session?.user?.email,
        },
        include: {
          jobListings: {
            orderBy: {
              created: "desc",
            },
            where: {
              status: params.status,
            },
            include: {
              applications: true,
            },
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
  if (data?.jobListings?.length <= 0)
    return (
      <div className="flex items-center justify-center w-full">
        <EmptyDataComponent />
      </div>
    );
  return (
    <div>
      <ApplicationItems data={data?.jobListings} />
    </div>
  );
};

export default Application;
