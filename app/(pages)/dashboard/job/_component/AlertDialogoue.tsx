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
import { Button } from "@/components/ui/button";
import { API } from "@/lib/config";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
export const AlertDialogBox = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API}/admin/category/${id}`);
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Deleted successfully");
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
          <Button variant={"destructive"}>
            <Loader className="animate-spin h-3 w-3 text-white mx-4" />
          </Button>
        ) : (
          <Button variant={"destructive"}>Delete</Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDelete();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
