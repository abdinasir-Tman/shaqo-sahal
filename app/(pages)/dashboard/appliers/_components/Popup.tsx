"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { API } from "@/lib/config";
import axios from "axios";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import NoteModal from "./NoteModal";

function Popup({ data }: any) {
  const router = useRouter();
  const admitFunction = async (appId: string, status: string) => {
    try {
      const getData = await axios.post(
        `${API}/api/jobSeeker/application/apply`,
        {
          appId,
          admited: status,
        }
      );

      router.refresh();
    } catch (error) {}
  };
  const isExpired = data.status === "request" || data.status === "canceled";
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVertical className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-24 flex items-start justify-start flex-col space-y-2">
        <span className="w-full cursor-pointer">
          <NoteModal data={data} />
        </span>

        <span
          onClick={() => {
            admitFunction(data.id, "approved");
          }}
          className={`w-full cursor-pointer ${
            isExpired ? "opacity-50 pointer-events-none" : ""
          }`}
          aria-disabled={isExpired ? "true" : "false"}
        >
          Approved
        </span>
      </PopoverContent>
    </Popover>
  );
}
export default Popup;
