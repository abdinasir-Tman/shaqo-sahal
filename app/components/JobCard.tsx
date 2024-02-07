"use client";
import React from "react";
import { getDaysLeft } from "../utils/daysLeft";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { API } from "@/lib/config";
interface JobCard {
  title: string;
  Employer: any;
  workType: string;
  location: string;
  salaryType: string;
  salary: number;
  jobCategory: string;
  deadline: any;
  id: string;
}
const JobCard = ({
  id,
  title,
  Employer,
  workType,
  location,
  salary,
  jobCategory,
  salaryType,
  deadline,
}: JobCard) => {
  const { data: session }: any = useSession();
  const router = useRouter();
  const isOwner = (id: string, email: string) => {
    if (session?.user.email === email) {
      toast.error("sorry not allowed the owner");
    } else {
      router.push(API + "/jobSeeker/applicant/" + id);
    }
  };
  return (
    <div
      onClick={() => {
        isOwner(id, Employer.email);
      }}
      className={`p-4 rounded-md cursor-pointer shadow 
        dark:shadow-gray-700
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
