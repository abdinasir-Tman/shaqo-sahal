import prisma from "@/prisma/client";
import React from "react";
import { ApplierList } from "./_components/ApplierList";

const Appliers = async ({ searchParams }: any) => {
  let data: any;
  try {
    data = await prisma?.jobListing.findFirst({
      where: {
        id: searchParams.id,
      },
      include: {
        applications: {
          include: {
            JobSeeker: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col items-start justify-start  gap-3 w-full md:w-[60rem] overflow-x-auto">
      <div className="p-9 mb-10 w-full">
        <h1>Job Title :{data?.title}</h1>
      </div>
      <div className="flex gap-1">
        <h1 className="text-lg font-medium w-[15rem]">Applier</h1>
        <h1 className="text-lg font-medium w-[12rem]">Status</h1>
        <h1 className="text-lg font-medium w-[15rem]">Personal Description</h1>
        <h1 className="text-lg font-medium w-[15rem]">Resume</h1>
        <h1 className="text-lg font-medium w-[5rem]">Admited</h1>
      </div>
      <ApplierList data={data} />
    </div>
  );
};

export default Appliers;
