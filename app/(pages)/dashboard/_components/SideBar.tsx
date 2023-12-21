"use client";
import { cn } from "@/lib/utils";
import { Briefcase, HeartHandshake, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
const sideRoutes = [
  {
    id: 1,
    path: "/job",
    label: "Job",
    icon: Briefcase,
  },
  {
    id: 2,
    path: "/application",
    label: "Application",
    icon: HeartHandshake,
  },
];
const SideBar = () => {
  return (
    <div className="h-full  flex flex-col overflow-y-auto dark:bg-main-900 bg-main-50">
      <h1 className="text-gray-400">S</h1>
      {/* sidebar items  */}
      <div className="mt-16">
        {sideRoutes.map((route) => (
          <ItemsList
            icon={route.icon}
            label={route.label}
            path={route.path}
            key={route.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;

// starts Sidebar items list Component
interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
}
const ItemsList = ({ icon: Icon, label, path }: SidebarItemProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const isActive = pathName.includes(path);

  return (
    <button
      onClick={() => router.push(`/dashboard/${path}`)}
      type="button"
      className={cn(
        "flex items-center gap-x-2 w-full dark:text-main-50  font-[500] pl-6 transition-all group hover:dark:bg-main-50 hover:bg-main-900 hover:text-main-50 hover:dark:text-main-900",
        isActive &&
          "dark:text-main-900 text-main-50 dark:bg-main-50 bg-main-900"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} />
        {label}
      </div>
    </button>
  );
};
