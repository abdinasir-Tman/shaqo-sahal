"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ResumeIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";

const ResumeView = ({ url }: any) => {
  const [isOk, setIsOk] = useState(false);
  const [numPages, setNumPages] = useState<number>();

  return (
    <div>
      <Dialog>
        <DialogTrigger>{<ResumeIcon />}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Applier resume</DialogTitle>
            <DialogDescription>
              <iframe
                src={"https://www.africau.edu/images/default/sample.pdf"}
                width="1110"
                height="412"
                allowFullScreen
              ></iframe>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeView;
