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
import { Loader, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import NoteModal from "./NoteModal";
import { useState } from "react";

function Popup({ data }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const admitFunction = async (appId: string, status: string) => {
    try {
      setLoading(true);
      const getData = await axios.post(
        `${API}/api/jobSeeker/application/apply`,
        {
          appId,
          admited: status,
        }
      );
      setLoading(false);
      router.refresh();
    } catch (error) {}
  };
  const isExpired = data.status == "request" || data.status == "canceled";
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVertical className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-24 flex items-start justify-start flex-col space-y-2">
        <span className="w-full cursor-pointer">
          <NoteModal data={data} />
        </span>
        {isExpired}
        <button
          onClick={() => {
            admitFunction(data.id, "approved");
          }}
          className={`w-full cursor-pointer ${
            isExpired ? "opacity-50 pointer-events-none" : ""
          }`}
          disabled={isExpired}
        >
          {loading ? <Loader className="animate-spin w-13 h-13" /> : "Approved"}
        </button>
      </PopoverContent>
    </Popover>
  );
}
export default Popup;
