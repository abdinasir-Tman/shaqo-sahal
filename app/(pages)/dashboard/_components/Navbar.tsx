"use client";
import { MoonIcon, SunIcon } from "lucide-react";

import React, { useEffect, useState } from "react";
import MobileMenu from "./MobileMenue";
import { ModeToggle } from "@/app/(pages)/jobs/_components/ThemeMode";

const Navbar = () => {
  return (
    <div className="p-3 h-full shadow-sm   w-full flex justify-between items-center dark:bg-black bg-white">
      <MobileMenu />

      <ModeToggle />
    </div>
  );
};

export default Navbar;
