import Nav from "@/app/(pages)/jobs/_components/Nav";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1024px] w-full h-screen">
      <div className="fixed top-0 inset-x-0 ">
        <Nav />
      </div>

      <div className="mt-[75px] md:pl-60 h-full container mx-auto py-7 flex justify-center">
        <div className="py-10 w-full">{children}</div>
      </div>
    </div>
  );
};

export default layout;
