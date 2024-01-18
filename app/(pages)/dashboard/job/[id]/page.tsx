import { notFound } from "next/navigation";
import React from "react";
import JobForm from "../_component/JobForm";
import prisma from "@/prisma/client";
const UpdateJobList = async ({ params }: { params: { id: string } }) => {
  const joblist = await prisma?.jobListing.findUnique({
    where: { id: params.id },
  });
  if (!joblist) return notFound();

  return (
    <div>
      <JobForm joblist={joblist} />
    </div>
  );
};

export default UpdateJobList;
