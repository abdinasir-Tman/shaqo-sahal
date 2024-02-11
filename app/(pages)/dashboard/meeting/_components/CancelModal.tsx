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
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader, Videotape } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CancelModal = ({ data }: any) => {
  const [note, setNote] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const CancelFunction = async (meetingId: string) => {
    setIsOpen(false);
    try {
      setLoading(true);
      await axios.post(`${API}/api/employer/meeting/${meetingId}`, {
        note,
      });
      toast.error("canceled the meeting");
      queryClient.invalidateQueries({ queryKey: ["profileMeetings"] });
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        {loading ? <Loader className="animate-spin w-13 h-13" /> : "Cancel"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tell the Reason</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                CancelFunction(data.id);
              }}
            >
              <Textarea
                className="w-full"
                required
                onChange={(e: any) => {
                  setNote(e.target.value);
                }}
              />
              <Button
                type="submit"
                className="mt-3 flex justify-center items-center gap-x-3"
              >
                Cancel <Videotape />
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CancelModal;
