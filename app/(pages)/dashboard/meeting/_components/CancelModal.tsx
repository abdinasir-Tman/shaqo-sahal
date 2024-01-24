import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { API } from "@/lib/config";
import axios from "axios";
import { Videotape } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CancelModal = ({ data }: any) => {
  const [note, setNote] = useState();
  const router = useRouter();
  const CancelFunction = async (meetingId: string) => {
    try {
      const getData = await axios.put(
        `${API}/api/employer/meeting/${meetingId}`,
        {
          note,
        }
      );
      toast.dismiss("canceled the meeting");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>Cancel</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tell the Reason</DialogTitle>
          <DialogDescription>
            <Textarea
              className="w-full"
              onChange={(e: any) => {
                setNote(e.target.value);
              }}
            />
            <Button
              className="mt-3 flex justify-center items-center gap-x-3"
              onClick={() => {
                CancelFunction(data.id);
              }}
            >
              Cancel <Videotape />
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CancelModal;
