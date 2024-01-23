import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter, Menu } from "lucide-react";
import React from "react";
import Filters from "./Filters";

const MobileFilter = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center md:hidden pr-4 hover:opacity-80 transition">
        <Filter className="dark:text-main-100 hover:dark:text-main-50 text-main-900 hover:text-main-950" />{" "}
        Filter
      </SheetTrigger>
      <SheetContent side={"right"} className="p-0 bg-white">
        <Filters />
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilter;
