import { getToken } from "@/app/utils/token";
import JobItem from "../_components/JobItem";
import prisma from "@/prisma/client";
import MobileFilter from "../_components/MobileFilter";
import EmptyDataComponent from "@/app/components/EmptyComponent";
const TimePage = async ({ searchParams }: any) => {
  const session: any = await getToken();

  let data: any;

  if (session?.user?.type == "jobSeeker") {
    const { usr }: any = await prisma?.jobSeeker.findFirst({
      where: {
        email: session.user?.email,
      },
    });
    data = await prisma?.jobListing.findMany({
      select: {
        title: true,
        description: true,
        salary: true,
        id: true,
        jobCategory: true,
        workType: true,
        location: true,

        created: true,
        Employer: {
          select: {
            logo: true,
            email: true,
            companyName: true,
          },
        },
      },
      orderBy: {
        created: "desc",
      },
      where: {
        jobCategory: { in: usr?.jobCategory },
        workType: {
          contains: searchParams.employment,
          mode: "insensitive",
        },
      },
    });
  } else {
    data = await prisma?.jobListing.findMany({
      select: {
        title: true,
        description: true,
        salary: true,
        id: true,
        jobCategory: true,
        workType: true,
        location: true,

        created: true,
        Employer: {
          select: {
            logo: true,
            email: true,
            companyName: true,
          },
        },
      },
      orderBy: {
        created: "desc",
      },
      where: {
        workType: {
          contains: searchParams.employment,
          mode: "insensitive",
        },
      },
    });
  }
  if (data?.length <= 0) return <EmptyDataComponent />;
  return (
    <div className="p-2 w-full space-y-3">
      <div className="flex md:block items-center justify-around gap-x-4">
        <h2 className="md:hidden">
          <MobileFilter />
        </h2>
        <h3 className="my-2 text-2xl dark:gray-400 font-semibold overflow-y-auto">
          {data?.length} Job Found
        </h3>
      </div>
      {data?.map((job: any) => (
        <JobItem key={job.id} {...job} />
      ))}
    </div>
  );
};

export default TimePage;
