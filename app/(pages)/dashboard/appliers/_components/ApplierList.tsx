"use client";

import React from "react";
import ResumeView from "./ResumeView";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";
export const ApplierList = ({ data }: any) => {
  const router = useRouter();
  console.log(data.applications);
  return (
    <div className="flex space-y-3 flex-col">
      {data?.applications.map((applier: any) => (
        <div className="flex items-center justify-start gap-2 space-y-2 text-sm w-full">
          {/* title name */}
          <div className="flex items-center justify-start gap-2">
            <span className="h-12 w-14 rounded-md bg-gray-400"></span>{" "}
            <span className="text-gray">{applier.JobSeeker?.name}</span>
          </div>
          <div className="truncate">{applier.coverLetter}</div>
          <div>
            <EmbedPDF>
              <a className="cursor-pointer" href={applier.resume}>
                <EyeClosedIcon />
              </a>
            </EmbedPDF>
          </div>
          <div>{applier.status}</div>
        </div>
      ))}
    </div>
  );
};
