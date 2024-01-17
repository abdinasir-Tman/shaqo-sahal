"use client";
import { cn } from "@/lib/utils";
import {
  HeartHandshake,
  LucideIcon,
  SquareUser,
  Videotape,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
const sideRoutes = [
  {
    id: 1,
    path: "/profile",
    label: "Profile",
    icon: SquareUser,
  },
  {
    id: 2,
    path: "/application",
    label: "Application",
    icon: HeartHandshake,
  },
  {
    id: 3,
    path: "/meeting",
    label: "Meeting",
    icon: Videotape,
  },
];
const SideBar = () => {
  return (
    <div className="h-full  flex flex-col overflow-y-auto ">
      <h1 className="flex items-center justify-center pt-5">
        <Link href="/">
          <Image src="/dark_logo.svg" width={53} height={53} alt="logo" />
        </Link>
      </h1>
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
      onClick={() => router.push(`/profile/${path}`)}
      type="button"
      className={cn(
        "flex items-center gap-x-2 w-full   font-[500] pl-6 transition-all",
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
