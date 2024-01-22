"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="flex flex-col  items-center md:flex-row gap-y-3 px-10 md:gap-x-3 bg-gray-100 dark:bg-gray-800 py-24">
      {/* left side  */}
      <div className="space-y-2 w-full">
        <h1 className="md:text-6xl text-2xl leading-10 md:leading-[5rem] font-sans font-bold md:text-left text-center">
          Got Talent ? <br /> Meet Opportunity
        </h1>
        <h1 className="text-xs md:text-2xl md:text-left text-center">
          Company reviews. Salaries. Interviews. Jobs.
        </h1>
        {/* search card  */}
        <div className="rounded-2xl md:rounded-lg py-3 px-5 flex items-center justify-center bg-white dark:bg-gray-900 flex-col md:flex-row w-full">
          <div className="w-full pb-3 md:pb-0 flex flex-col md:flex-row justify-center md:items-center">
            <div className="border-b-2 md:border-r-2 md:border-b-0 w-full pb-3 md:pb-0">
              <input
                className="text-xl h-full outline-none w-full bg-transparent"
                placeholder="Job title or keyword"
              />
            </div>
            <div className="md:border-r-2 md:border-b-0 border-b-2 w-full pb-3 md:pb-0 md:pl-1">
              <input
                className="text-xl outline-none h-full w-full bg-transparent"
                placeholder="Mogadishu"
              />
            </div>
          </div>

          <Button
            onClick={() => {
              router.push("/jobs?value=hargeisa");
            }}
            className="rounded-lg p-5 ml-2 bg-main-400 text-white w-full md:w-[10rem] mt-3 md:mt-0"
          >
            Search
          </Button>
        </div>
      </div>
      {/* right side  */}
      <div className="w-full">
        <Image
          src={"/interview.svg"}
          width={100}
          height={100}
          className="w-full h-full"
          alt={"interview image"}
        />
      </div>
    </section>
  );
};

export default Hero;
