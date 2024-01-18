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
    <div>
      <div className="flex space-y-3 flex-col w-full">
        {data?.applications.map((applier: any) => (
          <div
            key={applier.id}
            className="flex items-center justify-start gap-2 space-y-2 text-sm w-full border-b-2"
          >
            {/* title name */}
            <div className="flex items-center justify-start gap-2 w-[15rem]">
              <span className="h-12 w-14 rounded-md"></span>{" "}
              <span className="text-gray">{applier.JobSeeker?.name}</span>
            </div>
            <div className="w-[12rem] text-left flex flex-col gap-y-2">
              {applier.admited ? (
                <span className="px-3 py-1 w-1/2 rounded-full bg-green-300 text-black">
                  approved
                </span>
              ) : (
                <span className="px-3 py-1 w-1/2 rounded-full bg-red-300 text-black">
                  Rejected
                </span>
              )}
              <span className="flex items-center justify-start gap-x-2">
                Date: {new Date(applier.created).toDateString()}
              </span>
            </div>
            <div className="truncate w-[15rem]">{applier.coverLetter}</div>
            <div className="flex items-center justify-around  w-[15rem]">
              <EmbedPDF>
                <a className="cursor-pointer" href={applier.resume}>
                  <EyeClosedIcon />
                </a>
              </EmbedPDF>{" "}
              {/* @ts-ignore  */}
              <MeetingModal id={applier.id} />
            </div>
            <div className=" w-[5rem]">
              <Checkbox
                className="scale-150"
                defaultChecked={applier.admited}
                checked={applier.admited}
                onCheckedChange={(checked: boolean) =>
                  admitFunction(applier?.id, checked)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
