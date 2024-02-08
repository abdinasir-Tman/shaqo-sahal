import React from "react";
import SideBar from "./_components/SideBar";
import Navbar from "./_components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full max-w-7xl mx-auto">
      <div className="h-[75px] ml-0 md:ml-56 fixed inset-y-0 w-full z-10 shadow-lg dark:shadow-gray-900 bg-opacity-10">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-10 shadow-lg dark:shadow-gray-800">
        <SideBar />
      </div>
      <main className="mt-[75px] md:pl-60 h-full  mx-auto py-7 ">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
