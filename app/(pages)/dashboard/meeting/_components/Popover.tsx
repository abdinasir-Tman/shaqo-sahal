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

export function PopoverDemo({ data }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVertical className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-24 flex items-start justify-start flex-col space-y-2">
        <MeetingModal meeting={data} id={data.id} />

        <span className="w-full cursor-pointer">
          <CompleteDialogueBox id={data.id} />
        </span>
        <span className="w-full cursor-pointer">
          <AlertDialogBox id={data.id} />
        </span>
      </PopoverContent>
    </Popover>
  );
}
