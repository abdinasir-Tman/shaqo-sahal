import { formatDistance } from "date-fns";
import Image from "next/image";
import React from "react";
import ApplicantModal from "./_components/Modal";
import { getDaysLeft } from "@/app/utils/daysLeft";
import prisma from "@/prisma/client";

const Applicants = async ({ params }: { params: { jobId: string } }) => {
  let data: any;
  try {
    data = await prisma?.jobListing.findFirst({
      include: {
        Employer: true,
        applications: true,
      },
      where: {
        id: params?.jobId,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-10 rounded-md shadow-md dark:bg-gray-800 w-full relative">
      {/* title  */}
      <div className="flex space-x-2">
        <Image
          // @ts-ignore
          src={data?.Employer?.logo?.url}
          width={70}
          height={88}
          className="object-cover overflow-hidden"
          alt="logo"
        />
        <div>
          <h1 className="text-sm text-gray-500">
            {data?.Employer?.companyName}
          </h1>
          <h1 className="text-3xl font-serif font-thin">{data?.title}</h1>
        </div>
        <span className="absolute right-2">
          {formatDistance(new Date(data?.created!), new Date())}
        </span>
      </div>
      {/* content  */}
      <div className="flex flex-col space-y-3 md:justify-between md:flex-row md:space-x-3 mt-3">
        {/* left side location and employement time  */}
        <div>
          <span className="flex dark:text-white text-black items-center gap-x-1">
            <small className="text-lg font-bold"> Location:</small>
            <i>{data?.location}</i>
          </span>
          <span className="flex dark:text-white text-black items-center gap-x-1">
            <small className="text-lg font-bold"> Employment Type:</small>
            <i>{data?.workType}</i>
          </span>
          <span className="flex dark:text-white text-black items-center gap-x-1">
            <small className="text-lg font-bold"> Salary Type:</small>
            <i>{data?.salaryType}</i>
          </span>
        </div>

        {/* right side salary and date posted  */}
        <div>
          <span className="flex dark:text-white text-black items-center gap-x-1">
            <small className="text-lg font-bold"> Date Posted: </small>
            <i>{new Date(data?.created!).toDateString()}</i>
          </span>
          <span className="flex dark:text-white text-black items-center gap-x-1">
            <small className="text-lg font-bold"> Salary : </small>
            <i>${data?.salary}</i>
          </span>
          <span className="flex dark:text-white text-black items-center gap-x-1">
            <small className="text-lg font-bold"> Job Category : </small>
            <i>{data?.jobCategory}</i>
          </span>
        </div>
      </div>
      {/* Requirements  */}
      <div>
        <span className="text-2xl italic">Requirements</span>
        <p className="text-md mt-3">{data?.requirements}</p>
      </div>
      {/* description  */}
      <div>
        <span className="text-2xl italic">job Description</span>
        <p className="text-md mt-3">{data?.description}</p>
      </div>
      <div className="flex justify-between my-2 items-center">
        <h1 className="text-red-500">
          Applications : <i>{data?.applications?.length}</i>
        </h1>
        <h1>{getDaysLeft(data?.deadline)} Days left to apply </h1>
      </div>
      <div className="flex justify-end">
        <ApplicantModal jobId={data?.id!} employerId={data?.Employer?.id!} />
      </div>
    </div>
  );
};

export default Applicants;
