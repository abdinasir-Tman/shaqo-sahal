import { getToken } from "@/app/utils/token";

import React from "react";

import EmployerForm from "../../_components/EmployerForm";

const AppPage = async () => {
  let data;
  const { user }: any = await getToken();
  try {
    data = await prisma?.employer.findFirst({
      where: {
        email: user?.email,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <EmployerForm Employer={data!} />
    </div>
  );
};

export default AppPage;
