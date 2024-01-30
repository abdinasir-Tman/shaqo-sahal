"use client";
import { API } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Clock10, Loader2, MoreVertical, Video } from "lucide-react";
import React from "react";
import { HiOutlineCalendar } from "react-icons/hi";

import { PopoverDemo } from "./Popover";
import EmptyDataComponent from "@/app/components/EmptyComponent";
import Link from "next/link";
const MeetingList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["meeting"],
    queryFn: () =>
      axios.get(`${API}/api/employer/meeting`).then((res) => res.data),
    // staleTime: 60 * 1000,
    // retry: 3,
  });

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader2 className="animate-spin md:h-24 md:w-24  mx-2" />
      </div>
    );
  if (data.length <= 0) return <EmptyDataComponent />;
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
      {data.map((meeting: any) => (
        <section
          key={meeting.id}
          className="px-5 py-5 rounded-md space-y-3 dark:bg-gray-800 bg-gray-100"
        >
          <Link
            href={`/dashboard/appliers?id=${meeting?.Application.JobListing.id}`}
            className=" space-y-3 dark:bg-gray-800 bg-gray-100"
          >
            {/* First line  */}
            <div className="flex justify-between items-center">
              <h1 className="flex items-center justify-center gap-x-2">
                <HiOutlineCalendar />{" "}
                <span>{new Date(meeting.Date).toDateString()}</span>
              </h1>
              <h1>{meeting.time}</h1>
              <h1 className="px-2 h-8  py-1 flex items-center justify-center rounded-full dark:bg-gray-900 bg-white text-sm">
                {meeting.status}
              </h1>
            </div>
            {/* second Line  */}
            <h1>{meeting.Application.JobListing.title}</h1>
            {/* third Line  */}
            <h1 className="text-gray-500">
              Meeting with:{" "}
              <span className="text-green-400">
                {meeting.Application?.JobSeeker.name}
              </span>
            </h1>
            {/* last line  */}
          </Link>{" "}
          <div className="flex justify-between items-center">
            <h1 className="flex justify-center items-center gap-x-2">
              <Video />
              Via {meeting.type}
            </h1>
            <h1 className="flex justify-center items-center gap-x-2">
              <Clock10 /> {meeting.timeDuration} m
            </h1>
            <PopoverDemo data={meeting} />
          </div>
        </section>
      ))}
    </div>
  );
};

export default MeetingList;
