"use client";
import { API } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import JobSkeleton from "./JobSkeleton";
import JobItem from "./JobItem";

const AllJobs = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["job"],
    queryFn: () => axios.get(`${API}/allJobs`).then((res) => res.data),
    // staleTime: 60 * 1000,
    // retry: 3,
  });
  if (isLoading) return <JobSkeleton />;
  return (
    <div className="grid md:grid-cols-3 gap-2 p-2">
      {data.map((job: any) => (
        <JobItem {...job} />
      ))}
    </div>
  );
};

export default AllJobs;
