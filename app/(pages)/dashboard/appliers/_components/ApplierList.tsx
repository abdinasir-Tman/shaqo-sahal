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
import Popup from "./Popup";
export const ApplierList = ({ data }: any) => {
  const [check, setCheck] = useState(false);
  const router = useRouter();

  return (
    <div className="flex justify-center flex-col gap-4">
      {data?.applications.map((applier: any, i: any) => {
        return (
          <div
            key={applier.id}
            className={`flex flex-wrap items-center justify-start gap-4 p-4 rounded-lg  bg-gray-900 shadow-md
            `}
          >
            <span>{i + 1}</span>
            <span className="text-lg font-semibold">
              {applier.JobSeeker?.name}
            </span>
            {
              <span
                className={`px-4 py-1 rounded-full  ${
                  applier.admited == "approved"
                    ? "bg-green-200 text-green-600"
                    : applier.admited == "request"
                    ? "bg-purple-200 text-purple-600"
                    : applier.admited == "meeting"
                    ? "bg-purple-200 text-purple-600"
                    : "bg-red-200 text-red-600"
                }`}
              >
                {applier.admited}
              </span>
            }
            <a
              href={applier?.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={applier?.portfolio}
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
              <Popup data={applier} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
