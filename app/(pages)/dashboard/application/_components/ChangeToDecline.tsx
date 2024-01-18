"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { API } from "@/lib/config";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ChangeToDecline = ({ id }: { id: string }) => {
  const [isComplete, setIscomplete] = useState(false);
  const router = useRouter();
  const changeToDecline = async (id: string) => {
    try {
      setIscomplete(false);

      const { data } = await axios.patch(
        `${API}/api/employer/job/application/${id}`
      );
      router.refresh();
      setIscomplete(true);
      toast.success(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Checkbox
        checked={isComplete}
        onCheckedChange={() => changeToDecline(id)}
      />
    </div>
  );
};

export default ChangeToDecline;
