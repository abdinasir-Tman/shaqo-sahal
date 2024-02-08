import Nav from "@/app/(pages)/jobs/_components/Nav";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto w-full h-screen">
      <div className="fixed bg-white dark:bg-black  dark:shadow-gray-900 z-50 top-0 inset-x-0 ">
        <Nav />
      </div>

      <div className="mt-[75px]  h-full container mx-auto py-7 flex justify-center">
        <div className="py-10 w-full max-w-4xl mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default layout;
