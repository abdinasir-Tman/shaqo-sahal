"use client";

import React, { useState } from "react";
import ResumeView from "../../meeting/_components/MeetingModal";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";
import MeetingModal from "../../meeting/_components/MeetingModal";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { API } from "@/lib/config";
export const ApplierList = ({ data }: any) => {
  const [check, setCheck] = useState(false);
  const router = useRouter();
  const admitFunction = async (appId: string, checked: boolean) => {
    try {
      const getData = await axios.post(
        `${API}/api/jobSeeker/application/apply`,
        {
          appId,
          admited: checked,
        }
      );

      router.refresh();
    } catch (error) {}
  };
  return (
    <div className="flex flex-col gap-4">
      {data?.applications.map((applier: any) => {
        const isRequest =
          !applier.admited &&
          new Date(applier.created).getTime() ===
            new Date(applier.updated).getTime();
        return (
          <div
            key={applier.id}
            className={`flex flex-wrap items-center justify-start gap-4 p-4 rounded-lg  bg-white shadow-md
            `}
          >
            <span className="text-lg font-semibold">
              {applier.JobSeeker?.name}
            </span>
            {isRequest ? (
              <span className="px-4 py-1 rounded-full text-white bg-purple-500">
                Request
              </span>
            ) : (
              <span
                className={`px-4 py-1 rounded-full text-white ${
                  applier.admited ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {applier.admited ? "Approved" : "Rejected"}
              </span>
            )}
            <a
              href={applier.JobSeeker?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={applier.JobSeeker?.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Portfolio
            </a>
            <EmbedPDF>
              <a
                href={applier.resume}
                className="text-blue-500 hover:underline"
              >
                Resume
              </a>
            </EmbedPDF>
            {/* @ts-ignore  */}
            <MeetingModal
              id={applier.id}
              className="text-blue-500 hover:underline"
            >
              Meeting
            </MeetingModal>
            <div className="ml-auto">
              <Checkbox
                checked={applier.admited}
                onCheckedChange={(checked: boolean) =>
                  admitFunction(applier.id, checked)
                }
                className="scale-125"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
