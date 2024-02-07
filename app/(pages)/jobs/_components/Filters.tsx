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
        <span className="flex gap-x-2 justify-between items-center pl-3 py-2">
          <input
            className="scale-150"
            onChange={() => {
              router.push("/jobs");
              router.refresh();
            }}
            type="radio"
            name="all"
            value={"all"}
            id=""
          />
          All
        </span>
        <h1 className="font-mono italic text-2xl font-bold leading-[3rem]">
          Time Left
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
        <h1 className="font-mono italic text-2xl font-bold leading-[3rem]">
          Job Types
        </h1>
        <RadioGroup
          onValueChange={(e) => {
            router.push(`/jobs/employment?employment=${e}`);
          }}
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
      <div className="flex mt-2 items-start flex-col  gap-3 overflow-y-auto h-20"></div>
    </div>
  );
};

export default Filters;
