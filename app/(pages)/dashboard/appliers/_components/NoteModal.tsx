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
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const NoteModal = ({ data }: any) => {
  const [note, setNote] = useState();
  const router = useRouter();
  const admitFunction = async (appId: string, status: string) => {
    try {
      const getData = await axios.post(
        `${API}/api/jobSeeker/application/apply`,
        {
          appId,
          admited: status,
          note,
        }
      );
      toast.error("rejected");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>Rejected</DialogTrigger>
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
              className="mt-3"
              onClick={() => {
                admitFunction(data.id, "rejected");
              }}
            >
              Reject
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NoteModal;
