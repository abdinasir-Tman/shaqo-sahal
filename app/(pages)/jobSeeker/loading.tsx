import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="h-screen w-full flex justify-center items-center">
        <Loader2 className="animate-spin md:h-24 md:w-24  mx-2" />
      </div>
      .
    </div>
  );
};

export default Loading;
