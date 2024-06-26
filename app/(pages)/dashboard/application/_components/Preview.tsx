import { getToken } from "@/app/utils/token";
import { cn } from "@/lib/utils";
import prisma from "@/prisma/client";
import { RiPassPendingFill } from "react-icons/ri";
import React from "react";
import { AiFillSchedule } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
const Preview = async () => {
  const session: any = await getToken();

  let data: any;
  try {
    data = await prisma?.jobListing.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
      orderBy: {
        status: "desc",
      },
      where: {
        Employer: {
          email: session.user?.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
  // if (data?.length <= 3)
  //   return (
  //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
  //       <div className="p-3 border-b-4 rounded-md bg-gray-100 dark:bg-gray-800 border-green-800">
  //         <h1>Pending</h1>
  //         <div className="flex justify-between items-center">
  //           <h1 className="text-4xl font-sans font-bold">
  //             {data[0]?._count.status ? data[0]?._count.status : 0}
  //           </h1>
  //           <RiPassPendingFill className="text-7xl text-green-800" />
  //         </div>
  //       </div>

  //       {/* /////////////  */}
  //       <div className="p-3 border-b-4 rounded-md bg-gray-100 dark:bg-gray-800 border-blue-800">
  //         <h1>Interview</h1>
  //         <div className="flex justify-between items-center">
  //           <h1 className="text-4xl font-sans font-bold">
  //             {data[1]?._count.status ? data[1]?._count.status : 0}
  //           </h1>
  //           <AiFillSchedule className="text-7xl text-blue-800" />
  //         </div>
  //       </div>
  //       {/* /////////////  */}
  //       <div className="p-3 border-b-4 rounded-md bg-gray-100 dark:bg-gray-800 border-red-800">
  //         <h1>Declained</h1>
  //         <div className="flex justify-between items-center">
  //           <h1 className="text-4xl font-sans font-bold">
  //             {data[2]?._count.status ? data[2]?._count.status : 0}
  //           </h1>
  //           <FaLock className="text-7xl text-red-800" />
  //         </div>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      {data?.map((app: any) => (
        <div
          key={app.id}
          className={`p-3 border-b-4 rounded-md bg-gray-100 dark:bg-gray-800 ${
            app?.status == "pending"
              ? "border-b-green-700"
              : app?.status == "interview"
              ? "border-b-blue-800"
              : "border-b-red-800"
          }`}
        >
          {" "}
          <h1>{app?.status}</h1>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-sans font-bold">
              {app?._count.status ? app?._count.status : 0}
            </h1>
            {app?.status == "pending" ? (
              <RiPassPendingFill className="text-7xl text-green-800" />
            ) : app?.status == "interview" ? (
              <AiFillSchedule className="text-7xl text-blue-800" />
            ) : (
              <FaLock className="text-7xl text-red-800" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Preview;
