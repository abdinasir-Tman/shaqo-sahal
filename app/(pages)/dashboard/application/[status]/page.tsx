import { getToken } from "@/app/utils/token";
import React from "react";
import ApplicationItems from "../_components/ApplicationItems";
import { FaDatabase } from "react-icons/fa";

const Application = async ({ params }: { params: { status: string } }) => {
  let data;
  const { user }: any = await getToken();
  try {
    if (params.status == "all") {
      data = await prisma?.application.findMany({
        include: {
          JobListing: {
            include: {
              Employer: {
                where: {
                  email: user?.email,
                },
              },
            },
          },
        },
      });
    } else {
      data = await prisma?.application.findMany({
        where: {
          status: params.status,
        },
        include: {
          JobListing: {
            include: {
              Employer: {
                where: {
                  email: user?.email,
                },
              },
            },
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
  if (data!?.length == 0)
    return (
      <div className="flex items-center justify-center w-full">
        <FaDatabase className="text-9xl" />
      </div>
    );
  return (
    <div>
      <ApplicationItems data={data} />
    </div>
  );
};

export default Application;
