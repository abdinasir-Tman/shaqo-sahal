"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { API } from "@/lib/config";
import axios from "axios";
import { Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const NoteModal = ({ data }: any) => {
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const admitFunction = async (appId: string, status: string) => {
    try {
      setLoading(true);
      const getData = await axios.post(
        `${API}/api/jobSeeker/application/apply`,
        {
          appId,
          admited: status,
          note,
        }
      );
      setLoading(false);
      toast.error("rejected");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-center">
        {loading ? <Loader className="animate-spin w-13 h-13" /> : "Reject"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tell the Reason</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={() => {
                admitFunction(data.id, "rejected");
              }}
            >
              <Textarea
                required
                className="w-full"
                onChange={(e: any) => {
                  setNote(e.target.value);
                }}
              />
              <DialogFooter is="submit">
                <DialogClose>
                  <Button type="submit" className="mt-3">
                    Reject
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NoteModal;
