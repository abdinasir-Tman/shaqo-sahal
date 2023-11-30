"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
export default function Home() {
  return (
    <main className="bg-main-50 flex w-full h-screen justify-center items-center">
      <Button
        onClick={() => {
          signIn("google");
        }}
        className="max-w-lg p-3 space-x-3 bg-main-300 hover:bg-main-200 text-black"
      >
        <FcGoogle className="text-2xl" />{" "}
        <span className="text-xl">Sign with Google</span>
      </Button>
    </main>
  );
}
