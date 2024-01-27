"use client";
import { Button } from "@/components/ui/button";
import { HiOutlineCalendar } from "react-icons/hi";
import Image from "next/image";
import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { FaMoneyBillWave } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { formatDistance } from "date-fns";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface JobItems {
  Employer: any;
  id: string;
  title: string;
  salary: number;
  description: string;
  created: string;
  jobCategory: string;
  location: string;
  workType: string;
}
const JobItem = ({
  Employer,
  id,
  title,
  salary,
  description,
  created,
  jobCategory,
  location,
  workType,
}: JobItems) => {
  const router = useRouter();
  const { data: session }: any = useSession();
  const isOwner = (id: string, email: string) => {
    if (session?.user.email === email) {
      // toast.error("sorry not allowed the owner");
      router.push("/jobSeeker/applicant/" + id);
    } else {
      router.push("/jobSeeker/applicant/" + id);
    }
  };
  return (
    <div
      onClick={() => {
        isOwner(id, Employer?.email);
      }}
      className="flex flex-col rounded-sm cursor-pointer p-5 w-full shadow-lg dark:shadow-gray-900"
    >
      {/* title  */}
      <div className="flex space-x-3 py-2 w-full">
        {/* logo  */}
        <Image
          src={Employer?.logo.url}
          className="rounded-md border border-gray-500 object-cover"
          height={80}
          width={66}
          alt="logo"
        />
        <div className="flex flex-col">
          <h1 className="text-sm dark:text-gray-300">
            {Employer?.companyName}
          </h1>
          <h1 className="text-lg font-serif font-bold">{title}</h1>
        </div>
        {/* <div className="float-right"> */}
        <span className="float-right  flex space-x-2">
          {formatDistance(new Date(created || new Date()), new Date())} ago
        </span>

        {/* </div> */}
      </div>
      <hr />
      <div className="flex space-x-2 mt-3">
        <span className="flex dark:text-white text-black items-center gap-x-1">
          <HiLocationMarker /> {location}
        </span>
        <span className="flex dark:text-white text-black items-center gap-x-1">
          <HiClock /> {workType}
        </span>
        <span className="flex items-center gap-x-2">
          <HiOutlineCalendar />

          {new Date(created).toDateString()}
        </span>
        <span className="flex dark:text-white text-black items-center gap-x-1">
          <FaMoneyBillWave /> {salary}
        </span>
      </div>
      <div>
        <p className="mt-2 truncate">{description}</p>
        <span className=" float-left mt-2 font-serif italic p-2 bg-green-900 rounded-md text-white">
          {jobCategory}
        </span>
        <Button
          onClick={() => {
            isOwner(id, Employer?.email);
          }}
          size={"sm"}
          className="transition-all duration-300 my-2 float-right"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default JobItem;
