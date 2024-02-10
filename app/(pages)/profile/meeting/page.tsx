"use client";

import EmptyDataComponent from "@/app/components/EmptyComponent";
import { API } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import ProfileMeeting from "./_components/ProfileMeeting";

const MeetingPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["profileMeetings"],
    queryFn: () =>
      axios.get(`${API}/api/jobSeeker/meeting`).then((res) => res.data),
    // staleTime: 60 * 1000,
    // retry: 3,
  });

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader2 className="animate-spin md:h-24 md:w-24  mx-2" />
      </div>
    );
  if (data?.length <= 0) return <EmptyDataComponent />;
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
      {data?.map((meeting: any) => (
        <ProfileMeeting key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
};

export default MeetingPage;
