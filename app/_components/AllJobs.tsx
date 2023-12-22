"use client";
import { API } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllJobs = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["job"],
    queryFn: () => axios.get(`${API}/allJobs`).then((res) => res.data),
    // staleTime: 60 * 1000,
    // retry: 3,
  });
  console.log(isSuccess);
  console.log(data);
  return <div></div>;
};

export default AllJobs;
