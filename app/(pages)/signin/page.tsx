"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { API } from "@/lib/config";
import { redirect } from "next/navigation";

const Signin = () => {
  const { data: session }: any = useSession();
  if (session) return redirect(API);
  return (
    <div className="bg-main-50 dark:bg-main-950  w-full h-screen flex justify-center items-center">
      <Button
        variant={"ghost"}
        onClick={() => signIn("google", { callbackUrl: API })}
        className="max-w-lg p-3 space-x-3 bg-main-300 dark:bg-main-800 dark:hover:bg-main-900 dark:text-white text-black"
      >
        <FcGoogle className="text-2xl" />
        <span className="text-xl">Sign with Google</span>
      </Button>
    </div>
  );
};

export default Signin;
