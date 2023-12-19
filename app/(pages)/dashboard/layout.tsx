import React from "react";
import SideBar from "./_components/SideBar";
import Navbar from "./_components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[75px] ml-0 md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>
      <main className="mt-[75px] md:pl-56 h-full container mx-auto py-7 dark:bg-main-950 bg-main-50">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
