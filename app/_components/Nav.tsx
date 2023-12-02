"use client";
import { Button } from "@/components/ui/button";
import { SunIcon, Moon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
const Nav = () => {
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
  const router = useRouter();
  return (
    <div className="w-full flex justify-between items-center bg-main-100 dark:bg-main-900/60  p-3">
      {/* logo  */}
      <div>
        <Image
          src={`/${theme === "dark" ? "dark_logo.svg" : "light_logo.svg"}`}
          width={33}
          height={33}
          alt="logo"
        />
      </div>

      <div className="flex items-center gap-x-2">
        <span>
          {theme === "dark" ? (
            <SunIcon
              onClick={() => {
                switchTheme("light");
              }}
              className="text-main-50 cursor-pointer"
            />
          ) : (
            <Moon
              onClick={() => {
                switchTheme("dark");
              }}
              className="text-bg-main-950 cursor-pointer"
            />
          )}
        </span>
        <Button
          size={"sm"}
          onClick={() => {
            router.push("/signin");
          }}
          className="bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 transition-all duration-300"
        >
          Signin
        </Button>
      </div>
    </div>
  );
};

export default Nav;
