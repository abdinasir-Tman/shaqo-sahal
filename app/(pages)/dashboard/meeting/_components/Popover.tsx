import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import MeetingModal from "./MeetingModal";
import { AlertDialogBox } from "./AlertDialogue";
import { CompleteDialogueBox } from "./CompleteDialogue";
import CancelModal from "./CancelModal";

export function PopoverDemo({ data }: any) {
  const isExpired = data.status === "expired" || data.status === "canceled";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVertical className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-24 flex items-start justify-start flex-col space-y-2">
        <button
          className={`${isExpired ? "opacity-50 pointer-events-none" : ""}`}
          disabled={isExpired}
        >
          <MeetingModal isExpired={isExpired} meeting={data} id={data.id} />
        </button>

        <button
          className={`w-full cursor-pointer ${
            isExpired ? "opacity-50 pointer-events-none" : ""
          }`}
          disabled={isExpired}
        >
          <CompleteDialogueBox id={data.id} />
        </button>

        <span className="w-full cursor-pointer">
          <AlertDialogBox id={data.id} />
        </span>
        <button
          className={`${isExpired ? "opacity-50 pointer-events-none" : ""}`}
          disabled={isExpired}
        >
          <CancelModal data={data} />
        </button>
      </PopoverContent>
    </Popover>
  );
}
