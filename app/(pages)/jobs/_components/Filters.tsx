"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import React from "react";

const Filters = () => {
  const router = useRouter();
  return (
    <div className="flex items-center flex-col gap-6 ">
      {/* Time ago posted  */}
      <div className="flex items-start flex-col gap-3 overflow-y-auto">
        <h1 className="font-mono italic text-3xl font-bold leading-[3rem]">
          Time Ago
        </h1>
        <RadioGroup
          onValueChange={(e) => {
            router.push(`/jobs/time?time=${e}`);
          }}
          className="flex items-start gap-2 text-lg font-serif flex-col"
        >
          <li className="flex gap-x-2 justify-between items-center">
            <RadioGroupItem value="week" />
            <label htmlFor="">Week</label>
          </li>
          <li className="flex gap-x-2 justify-between items-center">
            <RadioGroupItem value="month" /> <label htmlFor="">Month</label>
          </li>
          <li className="flex gap-x-2 justify-between items-center">
            <RadioGroupItem value="2month" />
            <label htmlFor="">2 Months</label>
          </li>
        </RadioGroup>
      </div>
      {/* job types  */}
      <div className="flex items-start flex-col gap-3 overflow-y-auto">
        <h1 className="font-mono italic text-3xl font-bold leading-[3rem]">
          Job Types
        </h1>
        <RadioGroup
          onValueChange={(e) => {}}
          className="flex items-start gap-2 text-lg font-serif flex-col"
        >
          <li className="flex gap-x-2 justify-between items-center">
            <RadioGroupItem value="freelance" />
            <label htmlFor="">Freelance</label>
          </li>
          <li className="flex gap-x-2 justify-between items-center">
            <RadioGroupItem value="partTime" />{" "}
            <label htmlFor="">Part Time</label>
          </li>
          <li className="flex gap-x-2 justify-between items-center">
            <RadioGroupItem value="fullTime" />
            <label htmlFor="">Full Time</label>
          </li>
          <li className="flex gap-x-2 justify-between items-center">
            <RadioGroupItem value="temporary" />
            <label htmlFor="">Temporary</label>
          </li>
          <li className="flex gap-x-2 justify-between items-center">
            <RadioGroupItem value="internship" />
            <label htmlFor="">Internship</label>
          </li>
          <li className="flex gap-x-2 justify-between items-center">
            <RadioGroupItem value="consultant" />
            <label htmlFor="">Consultant</label>
          </li>
        </RadioGroup>
      </div>
      {/* salary type  */}
      <div className="flex items-start flex-col  gap-3 overflow-y-auto">
        <h1 className="font-mono italic text-3xl font-bold leading-[3rem]">
          Salary Type
        </h1>
        <RadioGroup
          onValueChange={(e) => {
            alert(e);
          }}
          className="flex flex-col items-start gap-2 text-lg font-serif"
        >
          <li className="flex gap-x-2 items-center ">
            <RadioGroupItem value="hour" /> <label htmlFor="">Hour</label>
          </li>
          <li className="flex gap-x-2 justify-between items-center">
            <RadioGroupItem value="week" /> <label htmlFor="">Week</label>
          </li>
          <li className="flex gap-x-2 justify-between items-center">
            <RadioGroupItem value="month" /> <label htmlFor="">Month</label>
          </li>
          <li className="flex gap-x-2 justify-between items-center">
            <RadioGroupItem value="year" /> <label htmlFor="">Year</label>
          </li>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Filters;