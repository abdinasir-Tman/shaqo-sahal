import { redirect } from "next/navigation";

import React from "react";

const Apply = async ({ params }: { params: { apply: string } }) => {
  const jobId = params?.apply;

  try {
    const updatedApp = await prisma?.application.update({
      where: {
        id: jobId,
      },
      data: {
        status: "interview",
      },
    });
  } catch (error) {
    console.log(error);
  }
  redirect("/dashboard/application");
  return <div>Apply</div>;
};

export default Apply;
