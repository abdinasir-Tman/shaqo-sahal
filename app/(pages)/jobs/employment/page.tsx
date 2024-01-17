import { getToken } from "@/app/utils/token";
import JobItem from "../_components/JobItem";

const TimePage = async ({ searchParams }: any) => {
  const { user }: any = await getToken();

  let data: any;

  if (user.type == "jobSeeker") {
    const usr = await prisma?.jobSeeker.findFirst({
      where: {
        email: user.email,
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
  }

  console.log(searchParams.time, data);
  return (
    <div className="p-2 w-full space-y-3">
      <h3 className="my-2 text-2xl dark:gray-400 font-semibold overflow-y-auto">
        {data?.length} Job Found
      </h3>
      {data.map((job: any) => (
        <JobItem {...job} />
      ))}
    </div>
  );
};

export default TimePage;
