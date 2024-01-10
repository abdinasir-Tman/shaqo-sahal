"use client";
import { API } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import JobSkeleton from "./JobSkeleton";
import JobItem from "./JobItem";
import { Input } from "@/components/ui/input";
import { HiOutlineSearch } from "react-icons/hi";

const AllJobs = () => {
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useQuery({
    queryKey: ["job"],
    queryFn: () =>
      axios.get(`${API}/allJobs`).then((res: any) => {
        setIsLoading(false);
        setData(res.data);
      }),
    staleTime: 50 * 1000,
    retry: 3,
  });
  const DataSearch = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${API}/allJobs/search`, {
        title: search,
      });
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="flex items-center flex-col">
      {/* search bar  */}
      <div className="flex md:justify-between w-full flex-shrink">
        <div className="w-full relative my-2">
          <Input
            className="w-full border"
            placeholder="Find your position"
            onChange={(e: any) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={() => {
              DataSearch();
            }}
            className="p-2 w-20 rounded-r-md absolute inset-y-0 right-0 items-center justify-center flex bg-main-400"
          >
            <HiOutlineSearch className="text-center text-3xl text-white" />
          </button>
        </div>
      </div>

      <div className="p-2 w-full space-y-3">
        <h3 className="my-2 text-2xl dark:gray-400 font-semibold overflow-y-auto">
          {data?.length} Job Found
        </h3>
        {isLoading ? (
          <JobSkeleton />
        ) : (
          data.map((job: any) => <JobItem {...job} />)
        )}
      </div>
    </div>
  );
};

export default AllJobs;
