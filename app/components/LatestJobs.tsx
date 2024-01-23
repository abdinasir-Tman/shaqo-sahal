import prisma from "@/prisma/client";
import React from "react";
import JobCard from "./JobCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
export const LatestJobs = async () => {
  let data: any;
  try {
    data = await prisma?.jobListing.findMany({
      include: {
        Employer: {
          select: {
            companyName: true,
          },
        },
      },
      where: {
        status: {
          not: "declined",
        },
      },
      orderBy: {
        created: "desc",
      },
    });
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="px-10 py-16">
      <h1 className="md:text-3xl font-medium text-gray-800 font-sans">
        Latest Jobs
      </h1>
      <div className="flex items-center justify-between text-gray-600  py-3 md:text-xl">
        <div className="flex space-x-3">
          <p>{data.length} jobs live &</p>
          <p>
            {
              data.filter(
                (d: any) =>
                  new Date(d.created).toDateString() ==
                  new Date().toDateString()
              ).length
            }{" "}
            added today .
          </p>
        </div>
        <Link
          className="text-lg font-sans hover:border-b-2 border-main-400 duration-300"
          href={"/jobs"}
        >
          View All jobs
        </Link>
      </div>
      <div className="px-3">
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full"
        >
          <CarouselContent>
            {data.map((job: any, index: number) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 pl-1"
              >
                <div className="p-1">
                  <JobCard key={job.id} {...job} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};