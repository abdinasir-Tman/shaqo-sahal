import React from "react";
import { getDaysLeft } from "../utils/daysLeft";
interface JobCard {
  title: string;
  Employer: any;
  workType: string;
  location: string;
  salaryType: string;
  salary: number;
  jobCategory: string;
  deadline: any;
}
const JobCard = ({
  title,
  Employer,
  workType,
  location,
  salary,
  jobCategory,
  salaryType,
  deadline,
}: JobCard) => {
  return (
    <div
      className={`p-4 rounded-lg shadow 
        dark:shadow-white
      `}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className="text-gray-700">
        by <span className="font-bold">{Employer?.companyName}</span> in{" "}
        <span className="text-green-500">{jobCategory}</span>
      </p>
      <div className="flex items-center justify-start space-x-2 py-4">
        <span
          className={`px-2 py-1 rounded-lg text-purple-500 bg-purple-200
          `}
        >
          {workType}
        </span>
        <span className="text-green-500 px-2 py-1 rounded-lg bg-green-100">
          {location}
        </span>
        <p className="text-green-500 px-2 py-1 rounded-lg bg-green-100">
          ${salary}/{salaryType}
        </p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-gray-500">
          {getDaysLeft(deadline)} days left to apply
        </p>
      </div>
    </div>
  );
};

export default JobCard;
