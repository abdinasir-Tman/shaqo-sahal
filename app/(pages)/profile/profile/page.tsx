import { getToken } from "@/app/utils/token";
import { cn } from "@/lib/utils";
import React from "react";
import { AiFillSchedule } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { RiPassPendingFill } from "react-icons/ri";
import JobSeekerForm from "../../_components/JobSeekerForm";

const AppPage = async () => {
  let data;
  const { user }: any = await getToken();
  try {
    data = await prisma?.jobSeeker.findFirst({
      where: {
        email: user?.email,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="grid md:grid-cols-2  gap-3">
      <JobSeekerForm jobSeeker={data!} />
    </div>
  );
};

export default AppPage;
