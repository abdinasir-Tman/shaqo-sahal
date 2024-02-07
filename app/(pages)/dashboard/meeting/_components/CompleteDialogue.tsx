"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { API } from "@/lib/config";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
export const CompleteDialogueBox = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const handleComplete = async () => {
    setLoading(true);
    try {
      await axios.post(`${API}/api/employer/meeting/${id}`, {
        status: "completed",
      });
      queryClient.invalidateQueries({ queryKey: ["meeting"] });
      toast.success("Completed successfully");
      setLoading(false);
    } catch (error) {
      toast.error("something went wrong please try again");
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {loading ? (
          <span className="text-pink-900">
            <Loader className="animate-spin h-3 w-3 text-white mx-4" />
          </span>
        ) : (
          <span className="w-full cursor-pointer">Complete</span>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            Are your sure ,you completed the meeting
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleComplete();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
