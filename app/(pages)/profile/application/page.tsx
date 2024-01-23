import { getToken } from "@/app/utils/token";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import prisma from "@/prisma/client";
import { AiFillSchedule } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { RiPassPendingFill } from "react-icons/ri";

const AppPage = async () => {
  let data: any;
  const session: any = await getToken();
  try {
    data = await prisma?.application.findMany({
      orderBy: {
        created: "desc",
      },
      include: {
        JobListing: {
          include: {
            Employer: true,
          },
        },
        JobSeeker: {
          where: {
            email: session.user?.email,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="grid md:grid-cols-2  gap-3">
      <h1 className="text-lg font-bold font-mono">
        total applied jobs {data?.length}
      </h1>
      <span></span>
      {data?.map((app: any, i: any) => (
        <div
          key={i}
          className="py-5 px-10 border-b-3 rounded-md bg-gray-100 dark:bg-gray-800 flex flex-col gap-y-2"
        >
          {/* title and status  */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-xl font-semibold font-fans">
                {app?.JobListing?.title}
              </h1>
              <h1 className="text-md font-thin">
                {app?.JobListing?.jobCategory}/ {app?.JobListing?.workType}/
                {app?.JobListing?.location}
              </h1>
            </div>
            <div className="w-[11rem] text-left flex flex-col gap-y-2">
              {!app.admited &&
              new Date(app.created).getTime() ===
                new Date(app.updated).getTime() ? (
                <span className="px-4 py-1 rounded-full text-white bg-purple-500">
                  Request
                </span>
              ) : (
                <span
                  className={`px-4 py-1 rounded-full text-white ${
                    app.admited ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {app.admited ? "Approved" : "Rejected"}
                </span>
              )}
              <span className="flex items-center justify-start gap-x-2">
                Date: {new Date(app?.created).toDateString()}
              </span>
            </div>
          </div>
          {/* employer  */}
          <div className="flex gap-3">
            <Image
              src={app.JobListing?.Employer?.logo.url}
              height={50}
              width={60}
              className="rounded-lg"
              alt="logo"
            />{" "}
            <span>{app.JobListing?.Employer?.companyName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppPage;
