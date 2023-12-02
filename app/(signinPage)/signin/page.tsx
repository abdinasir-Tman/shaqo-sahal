"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import React from "react";

const Signin = () => {
  return (
    <div className="bg-main-50 dark:bg-main-950 max-w-5xl w-full h-screen flex justify-center items-center">
      <Button
        onClick={() => {
          signIn("google");
        }}
        className="max-w-lg p-3 space-x-3 bg-main-300 dark:bg-main-800 hover:bg-main-900/50 dark:text-white text-black"
      >
        <FcGoogle className="text-2xl" />{" "}
        <span className="text-xl">Sign with Google</span>
      </Button>
    </div>
  );
};

export default Signin;
