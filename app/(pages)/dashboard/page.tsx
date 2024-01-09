import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = () => {
  redirect("/dashboard/application");
  return <div className="w-full h-full">page</div>;
};

export default DashboardPage;
