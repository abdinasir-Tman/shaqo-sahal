import { cn } from "@/lib/utils";
import React from "react";
import { AiFillSchedule } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { RiPassPendingFill } from "react-icons/ri";
import ChangeToDecline from "./ChangeToDecline";
import Link from "next/link";

const ApplicationItems = ({ data }: any) => {
  return (
    <div className="grid md:grid-cols-2  gap-3">
      {data?.map((app: any) => (
        <Link
          key={app.id}
          href={"/dashboard/appliers?id=" + app.id}
          className={`
            p-3 border-b-3 rounded-md bg-gray-100 dark:bg-gray-800
            
          `}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-gray-500 text-sm">{app?.status}</h1>
            <h1 className="text-gray-500 text-sm">
              {app?.applications.length}
            </h1>
          </div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-sans">{app?.title}</h1>
            {app?.status == "interview" && (
              <h1>
                <ChangeToDecline id={app?.id} />
              </h1>
            )}
          </div>
          <div className="flex justify-between items-center">
            {app?.status == "pending" ? (
              <RiPassPendingFill className="text-7xl text-green-800" />
            ) : app?.status == "interview" ? (
              <AiFillSchedule className="text-7xl text-blue-800" />
            ) : (
              <FaLock className="text-7xl text-red-800" />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ApplicationItems;
