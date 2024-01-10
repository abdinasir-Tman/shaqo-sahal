"use client";
import { notFound } from "next/navigation";
import React from "react";
import JobItem from "./JobItem";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/config";
import JobSkeleton from "./JobSkeleton";

const SearchData = ({ search }: { search: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["gotJobs"],
    queryFn: () =>
      axios
        .post(`${API}/allJobs/search`, {
          title: search,
        })
        .then((res) => res.data),
  });

  if (isLoading) return <JobSkeleton />;
  return (
    <div className="p-2 w-full spacey-2">
      <h3 className="my-2 text-2xl dark:gray-400 font-semibold overflow-y-auto">
        {data?.length} Job Found
      </h3>

      {data.map((job: any) => (
        <JobItem {...job} />
      ))}
    </div>
  );
};

export default SearchData;
