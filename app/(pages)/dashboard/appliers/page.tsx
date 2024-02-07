import prisma from "@/prisma/client";
import React from "react";
import { ApplierList } from "./_components/ApplierList";

const Appliers = async ({ searchParams }: any) => {
  let data: any;
  try {
    data = await prisma?.jobListing.findFirst({
      where: {
        id: searchParams?.id,
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
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-2xl dark:text-gray-100 font-bold mb-2">
          Job Title: {data?.title}
        </h1>
        <p className="text-lg text-gray-600">Category: {data?.jobCategory}</p>
        <p className="text-md mt-4 dark:text-gray-100">
          Description <br /> {data?.description}
        </p>
      </div>
      <h1 className="font-bold mb-2 text-2xl font-sans">Appliers</h1>
      <ApplierList data={data} />
    </div>
  );
};

export default Appliers;
