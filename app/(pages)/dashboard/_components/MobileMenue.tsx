import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import SideBar from "./SideBar";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center md:hidden pr-4 hover:opacity-80 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"right"} className="p-0 bg-white">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
