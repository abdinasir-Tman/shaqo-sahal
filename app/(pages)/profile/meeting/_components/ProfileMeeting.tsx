import CancelModal from "@/app/(pages)/dashboard/meeting/_components/CancelModal";
import { Clock10, Video } from "lucide-react";
import { HiOutlineCalendar } from "react-icons/hi";

const ProfileMeeting = ({ meeting }: any) => {
  return (
    <div
      key={meeting.id}
      className="px-5 py-5 rounded-md space-y-3 dark:bg-gray-800 bg-gray-100"
    >
      {/* First line  */}
      <div className="flex justify-between items-center">
        <h1 className="flex items-center justify-center gap-x-2">
          <HiOutlineCalendar />{" "}
          <span>{new Date(meeting?.Date).toDateString()}</span>
        </h1>
        <h1>{meeting?.time}</h1>
        <h1 className="px-2 h-8  py-1 flex items-center justify-center rounded-full dark:bg-gray-900 bg-white text-sm">
          {meeting?.status}
        </h1>
      </div>
      {/* second Line  */}
      <h1>{meeting?.Application?.JobListing?.title}</h1>
      {/* third Line  */}
      <h1 className="text-gray-500">
        Meeting with:
        <span className="text-green-400">
          {meeting?.Application?.JobListing.Employer?.companyName}
        </span>
      </h1>
      {/* last line  */}
      <div className="flex justify-between items-center">
        <h1 className="flex justify-center items-center gap-x-2">
          <Video />
          Via {meeting?.type}
        </h1>
        <h1 className="flex justify-center items-center gap-x-2">
          <Clock10 className="h-5" /> {meeting?.timeDuration} m
        </h1>
        <h2 className="flex justify-center items-center">
          <CancelModal data={meeting} />
        </h2>
      </div>
    </div>
  );
};

export default ProfileMeeting;
