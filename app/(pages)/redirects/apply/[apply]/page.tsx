import sendInterviewEmail from "@/app/utils/emails/interviewtimemail";
import { getToken } from "@/app/utils/token";
import { redirect } from "next/navigation";

interface Apply {
  params: {
    apply: string;
  };
  searchParams: any;
}
const Apply = async ({ params, searchParams }: Apply) => {
  const jobId = params?.apply;
  let day = new Date();
  const { to } = searchParams;

  day.setHours(day.getHours() + 24 * 5);

  const { user }: any = await getToken();
  console.log(user?.email, to, searchParams);
  try {
    const updatedApp = await prisma?.application.update({
      where: {
        id: jobId,
      },
      data: {
        status: "interview",
      },
    });
    if (updatedApp) {
      await sendInterviewEmail(user?.email, to, day.toDateString());
    }
  } catch (error) {
    console.log(error);
  }
  redirect("/dashboard/application");
};

export default Apply;
