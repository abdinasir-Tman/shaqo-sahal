"use client";
import { Button } from "@/components/ui/button";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { ModeToggle } from "./ThemeMode";
const Nav = () => {
  const { data: session }: any = useSession();

  const router = useRouter();

  return (
    <div className="z-50 w-full max-w-7xl mx-auto flex justify-between items-center  p-3 shadow-lg ">
      {/* logo  */}
      <div>
        <Link href="/">
          <Image src="/dark_logo.svg" width={33} height={33} alt="logo" />
        </Link>
      </div>

      <div className="flex items-center gap-x-2">
        <Link href="/jobs" className="transition-all duration-300 mr-10">
          Jobs
        </Link>
        <ModeToggle />

        {session ? (
          session?.user?.type === "employer" ? (
            <Button
              size={"sm"}
              onClick={() => {
                router.push("/dashboard");
              }}
              className="bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 transition-all duration-300"
            >
              Dashboard
            </Button>
          ) : session?.user?.type === "jobSeeker" ? (
            <Button
              size={"sm"}
              onClick={() => {
                router.push("/profile");
              }}
              className="bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 transition-all duration-300"
            >
              Profile
            </Button>
          ) : (
            <Button
              size={"sm"}
              onClick={() => {
                router.push("/register");
              }}
              className="bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 transition-all duration-300"
            >
              Complete your profile
            </Button>
          )
        ) : (
          <p></p>
        )}
        {session ? (
          <Button
            size={"sm"}
            onClick={() => signOut()}
            className="transition-all duration-300"
          >
            Signout
          </Button>
        ) : (
          <Button
            size={"sm"}
            onClick={() => {
              router.push("/signin");
            }}
            className="bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 transition-all duration-300"
          >
            Signin
          </Button>
        )}
      </div>
    </div>
  );
};

export default Nav;
