import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";

interface JobItems {
  Employer: any;
  id: string;
  title: string;
  salary: number;
  description: string;
  created: string;
  jobCategory: string;
}
const JobItem = ({
  Employer,
  id,
  title,
  salary,
  description,
  created,
  jobCategory,
}: JobItems) => {
  return (
    <div className="flex flex-col rounded-sm dark:bg-main-900 p-2 bg-main-200 cursor-pointer">
      {/* title  */}
      <div className="flex space-x-3">
        {/* logo  */}
        <div>
          <Image
            src={Employer?.logo}
            className="rounded-md p-1 object-fill"
            height={66}
            width={66}
            alt="logo"
          />
        </div>

        <div>
          <h1 className="dark:text-white text-2xl font-semibold text-black">
            {title}
          </h1>
        </div>
      </div>
      <hr />
      <div className="flex justify-between mt-3">
        <span className="flex dark:text-white text-black items-center gap-x-2">
          <CalendarIcon />

          {new Date(created).toDateString()}
        </span>
        <span className="flex dark:text-white text-black items-center gap-x-2">
          <FaMoneyBillWave /> ${salary}
        </span>
      </div>
      <div>
        <p className="mt-2 dark:text-white text-black">{description}</p>
        <span className="dark:text-white text-black float-left mt-2 font-serif italic">
          {jobCategory}
        </span>
        <Button
          size={"sm"}
          className="bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 transition-all duration-300 mt-2 float-right"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default JobItem;
