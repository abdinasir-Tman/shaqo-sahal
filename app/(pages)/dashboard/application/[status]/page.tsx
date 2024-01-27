import { getToken } from "@/app/utils/token";
import React from "react";
import prisma from "@/prisma/client";
import ApplicationItems from "../_components/ApplicationItems";
import { FaDatabase } from "react-icons/fa";
import EmptyDataComponent from "@/app/components/EmptyComponent";

const Application = async ({ params }: { params: { status: string } }) => {
  let data;
  const session: any = await getToken();
  try {
    if (params.status == "all") {
      data = await prisma?.jobListing.findMany({
        orderBy: {
          created: "desc",
        },
        include: {
          Employer: {
            where: {
              email: session.user?.email,
            },
          },
          applications: true,
        },
      });
    } else {
      data = await prisma?.jobListing.findMany({
        orderBy: {
          created: "desc",
        },
        where: {
          status: params.status,
        },

        include: {
          Employer: {
            where: {
              email: session.user?.email,
            },
          },
          applications: true,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
  if (data!?.length == 0)
    return (
      <div className="flex items-center justify-center w-full">
        <EmptyDataComponent />
      </div>
    );
  return (
    <div>
      <ApplicationItems data={data} />
    </div>
  );
};

export default Application;
