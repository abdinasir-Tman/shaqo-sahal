"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Suggest = () => {
  const router = useRouter();
  const { data: session }: any = useSession();

  const redirectFunction = (role: string) => {
    if (session) {
      router.push(`/${role}`);
    } else {
      router.push("/singin");
    }
  };
  if (session?.user.type == "jobSeeker") {
    return (
      <section className="flex flex-col md:flex-row justify-between md:space-x-4 md:space-y-0 space-y-3 items-center px-10 py-16">
        <div className="relative z-30 p-10 bg-main-100 dark:bg-main-900 rounded-lg flex justify-between w-full">
          <div className="flex z-20 flex-col space-y-3">
            <h1 className="text-2xl font-bold">For Job Seeker</h1>
            <h2 className="text-lg w-[20rem]">
              Build your professional profile,
              <br /> find new job opportunities.
            </h2>
            <Button
              onClick={() => {
                redirectFunction("profile");
              }}
              className="rounded-lg p-5 ml-2 bg-main-400 text-white w-[10rem] mt-3 md:mt-0"
            >
              Upload cv
            </Button>
          </div>
          {/* image  */}

          <div className="absolute z-10 top-14 bottom-36 right-2">
            <Image
              width={200}
              height={200}
              className="animate-bounce4 ease-in-out"
              src="/jobSeeker.svg"
              alt="employer"
            />
          </div>
        </div>
        <div className="w-full">
          <Image
            src={"/welcomeback.gif"}
            alt="welcome"
            height={10}
            width={50}
            className="hidden md:flex w-30 h-[14.3rem] rounded-lg w-[36rem]"
          />
        </div>
      </section>
    );
  } else if (session?.user.type == "employer") {
    return (
      <section className="flex flex-col md:flex-row justify-between md:space-x-4 md:space-y-0 space-y-3 items-center px-10 py-16">
        <div className="relative z-30 p-10 bg-main-100 dark:bg-main-900 rounded-lg flex justify-between items-center w-full">
          <div className="flex z-20 flex-col space-y-3">
            <h1 className="text-2xl font-bold">For Employers</h1>
            <h2 className="text-lg w-[20rem]">
              Find professionals from around <br /> the world and across all
              skills.
            </h2>
            <Button
              onClick={() => {
                redirectFunction("dashboard");
              }}
              className="rounded-lg p-5 ml-2 bg-main-400 text-white w-[10rem] mt-3 md:mt-0"
            >
              Post jobs for free
            </Button>
          </div>
          {/* image  */}

          <div className="absolute z-10 top-14 bottom-36 right-2">
            <Image
              width={200}
              height={200}
              className="animate-bounce4 ease-linear"
              src="/employer.svg"
              alt="employer"
            />
          </div>
        </div>
        <div className="w-full">
          <Image
            src={"/welcomeback.gif"}
            alt="welcome"
            height={10}
            width={50}
            className="hidden md:flex w-30 h-[14.3rem] rounded-lg w-[36rem]"
          />
        </div>
      </section>
    );
  } else if (!session) {
    return (
      <section className="flex flex-col md:flex-row justify-between md:space-x-4 md:space-y-0 space-y-3 items-center px-10 py-16">
        <div className="relative z-30 p-10 bg-main-100 dark:bg-main-900 rounded-lg flex justify-between items-center w-full">
          <div className="flex z-20 flex-col space-y-3">
            <h1 className="text-2xl font-bold">For Employers</h1>
            <h2 className="text-lg w-[20rem]">
              Find professionals from around <br /> the world and across all
              skills.
            </h2>
            <Button
              onClick={() => {
                redirectFunction("dashboard");
              }}
              className="rounded-lg p-5 ml-2 bg-main-400 text-white w-[10rem] mt-3 md:mt-0"
            >
              Post jobs for free
            </Button>
          </div>
          {/* image  */}

          <div className="absolute z-10 top-14 bottom-36 right-2">
            <Image
              width={200}
              height={200}
              className="animate-bounce4 ease-linear"
              src="/employer.svg"
              alt="employer"
            />
          </div>
        </div>
        {/* job seeker  */}
        <div className="relative z-30 p-10 bg-main-100 dark:bg-main-900 rounded-lg flex justify-between w-full">
          <div className="flex z-20 flex-col space-y-3">
            <h1 className="text-2xl font-bold">For Candidates</h1>
            <h2 className="text-lg w-[20rem]">
              Build your professional profile,
              <br /> find new job opportunities.
            </h2>
            <Button
              onClick={() => {
                redirectFunction("profile");
              }}
              className="rounded-lg p-5 ml-2 bg-main-400 text-white w-[10rem] mt-3 md:mt-0"
            >
              Upload cv
            </Button>
          </div>
          {/* image  */}

          <div className="absolute z-10 top-14 bottom-36 right-2">
            <Image
              width={200}
              height={200}
              className="animate-bounce4 ease-in-out"
              src="/jobSeeker.svg"
              alt="employer"
            />
          </div>
        </div>
      </section>
    );
  }
};

export default Suggest;
