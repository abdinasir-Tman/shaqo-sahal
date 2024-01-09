"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

const Filters = () => {
  return (
    <div className="flex items-center flex-col gap-6 ">
      {/* Time ago posted  */}
      <div className="flex items-start flex-col gap-3">
        <h1 className="font-mono italic text-3xl font-bold leading-[3rem]">
          Time Ago
        </h1>
        <RadioGroup
          onValueChange={(e) => {
            alert(e);
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

      {/* salary type  */}
      <div className="flex items-start flex-col overflow-auto gap-3">
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
