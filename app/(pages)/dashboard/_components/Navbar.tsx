"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState<string>("light");
  const getThemefromLocalStorage = () => {
    const Theme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")!
      : "light";
    setTheme(Theme);
  };
  useEffect(() => {
    getThemefromLocalStorage();

    theme === "light"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, []);
  const switchTheme = (themeMode: string) => {
    setTheme(themeMode);
    theme === "light"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  };
  return (
    <div className="p-3 h-full shadow-sm   w-full flex justify-between items-center bg-main-50 dark:bg-main-900">
      <Link href="/">
        <Image
          src={`/${theme === "dark" ? "dark_logo.svg" : "light_logo.svg"}`}
          width={33}
          height={33}
          alt="logo"
        />
      </Link>
      <span>
        {theme === "dark" ? (
          <SunIcon
            onClick={() => {
              switchTheme("light");
            }}
            className="text-main-50 cursor-pointer"
          />
        ) : (
          <MoonIcon
            onClick={() => {
              switchTheme("dark");
            }}
            className="text-bg-main-950 cursor-pointer"
          />
        )}
      </span>
    </div>
  );
};

export default Navbar;
