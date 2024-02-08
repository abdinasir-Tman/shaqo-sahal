"use client";
import { API } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import JobSkeleton from "./JobSkeleton";
import JobItem from "./JobItem";
import { Input } from "@/components/ui/input";
import { HiOutlineSearch } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import MobileFilter from "./MobileFilter";

const AllJobs = () => {
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  let value: any;
  useSearchParams().forEach((val, key) => {
    value = val;
  });

  useQuery({
    queryKey: ["job"],
    queryFn: () =>
      axios
        .get(value ? `${API}/api/allJobs?val=${value}` : `${API}/api/allJobs`)
        .then((res: any) => {
          setIsLoading(false);
          setData(res.data);
        }),
    staleTime: 50 * 1000,
    retry: 3,
  });
  const DataSearch = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${API}/api/allJobs/search`, {
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
        <div className="flex md:block items-center justify-around gap-x-4">
          <h2 className="md:hidden">
            <MobileFilter />
          </h2>
          <h3 className="my-2 text-2xl dark:gray-400 font-semibold overflow-y-auto">
            {data?.length} Job Found
          </h3>
        </div>
        {isLoading ? (
          <JobSkeleton />
        ) : (
          data?.map((job: any) => <JobItem key={job.id} {...job} />)
        )}
      </div>
    </div>
  );
};

export default AllJobs;
