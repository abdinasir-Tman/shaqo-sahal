"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const UpdateBtn = ({ joblistInfo }: any) => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("./job/" + joblistInfo.id)}>
      Update
    </Button>
  );
};
