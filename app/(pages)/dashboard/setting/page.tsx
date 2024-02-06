import { getToken } from "@/app/utils/token";
import prisma from "@/prisma/client";
import React from "react";

import EmployerForm from "../../_components/EmployerForm";

const AppPage = async () => {
  let data;
  const session: any = await getToken();
  try {
    data = await prisma?.employer.findFirst({
      where: {
        email: session.user?.email,
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
