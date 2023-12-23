"use client";
import { API } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import JobSkeleton from "./JobSkeleton";
import JobItem from "./JobItem";
import { Input } from "@/components/ui/input";
import { BsSearch } from "react-icons/bs";
const AllJobs = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["job"],
    queryFn: () => axios.get(`${API}/allJobs`).then((res) => res.data),
    staleTime: 50 * 1000,
    retry: 3,
  });
  if (isLoading) return <JobSkeleton />;
  return (
    <div className="flex items-center flex-col">
      {/* search bar  */}
      <div className="relative dark:bg-main-800 bg-main-200 flex md:justify-between w-full flex-shrink">
        <div className="w-56">
          <Input className="w-full opacity-60 border" />
          <button className="dark:bg-main-950 bg-main-300 p-2 rounded-r-md absolute inset-y-0 right-0">
            <BsSearch className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-2 p-2">
        {" "}
        {data.map((job: any) => (
          <JobItem {...job} />
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
