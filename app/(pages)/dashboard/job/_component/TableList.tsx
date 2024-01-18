"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "@/lib/config";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../columns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const List = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["job"],
    queryFn: () => axios.get(`${API}/api/employer/job`).then((res) => res.data),
    // staleTime: 60 * 1000,
    // retry: 3,
  });
  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader2 className="animate-spin md:h-24 md:w-24  mx-2" />
      </div>
    );
  return (
    <div className="my-4 space-y-4 sm:p-6 lg:p-2">
      <div className="flex justify-end">
        <Button
          onClick={() => router.push("./job/new")}
          className="bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 transition-all duration-300"
        >
          Create New Job
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default List;
