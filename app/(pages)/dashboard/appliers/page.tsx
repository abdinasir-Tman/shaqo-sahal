import { EyeClosedIcon } from "@radix-ui/react-icons";

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
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col items-start justify-start  gap-3 w-full md:w-[48rem] overflow-x-auto">
      <div className="flex gap-4 w-full">
        <h1 className="text-lg font-medium">Applier</h1>
        <h1 className="text-lg font-medium">Personal Description</h1>
        <h1 className="text-lg font-medium">Resume</h1>
        <h1 className="text-lg font-medium">Admited</h1>
      </div>
      <ApplierList data={data} />
    </div>
  );
};

export default Appliers;
