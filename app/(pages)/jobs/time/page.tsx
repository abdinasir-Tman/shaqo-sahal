import { getToken } from "@/app/utils/token";
import JobItem from "../_components/JobItem";

const TimePage = async ({ searchParams }: any) => {
  let date = new Date();
  const { user }: any = await getToken();
  if (searchParams.time == "month") {
    date.setMonth(date.getMonth() + 1);
  } else if (searchParams.time == "2month") {
    date.setMonth(date.getMonth() + 2);
  } else {
    date.setHours(date.getHours() + 24 * 7);
  }
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
        deadline: {
          gte: date,
        },
      },
    });
  }

  console.log(searchParams.time, date, data);
  return (
    <div className="p-2 w-full space-y-3">
      <h3 className="my-2 text-2xl dark:gray-400 font-semibold overflow-y-auto">
        {data?.length} Job Found
      </h3>
      {data.map((job: any) => (
        <JobItem key={job.id} {...job} />
      ))}
    </div>
  );
};

export default TimePage;
