import { getToken } from "@/app/utils/token";
import { cn } from "@/lib/utils";
import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { AiFillSchedule } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { RiPassPendingFill } from "react-icons/ri";

const AppPage = async () => {
  let data;
  const session: any = await getToken();
  try {
    data = await prisma?.jobListing.findMany({
      orderBy: {
        created: "desc",
      },

      include: {
        Employer: {
          where: {
            email: session.user?.email,
          },
        },
        applications: true,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="grid md:grid-cols-2  gap-3">
      {data?.map((app: any) => (
        <Link
          key={app.id}
          href={"/dashboard/appliers?id=" + app.id}
          className={cn(
            "p-3 border-b-3 rounded-md bg-gray-100 dark:bg-gray-800",
            app?.status === "pending"
              ? "border-b-green-800"
              : app?.status === "interview"
              ? "border-b-blue-800"
              : "border-b-red-800"
          )}
        >
          {" "}
          <div className="flex justify-between items-center">
            <h1 className="text-gray-500 text-sm">{app?.status}</h1>
            <h1 className="text-gray-500 text-sm">
              {app?.applications.length}
            </h1>
          </div>
          <h1 className="text-2xl font-sans">{app?.title}</h1>
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

export default AppPage;
