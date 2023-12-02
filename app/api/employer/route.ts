import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import ValidateEmployer from "./employerSchemaValidator";
export const POST = async (req: NextRequest) => {
  if (req.headers.get("content-length") === "0")
    return NextResponse.json(
      { error: "please insert the body some info" },
      { status: 400 }
    );

  try {
    const body = await req.json();
    const validate = ValidateEmployer.safeParse(body);
    if (!validate.success) return NextResponse.json({ status: 400 });
    const newEmployer = prisma.employer.create({
      data: {
        companyName: body.companyName,
        address: body.address,
        logo: body.url,
        email: body.email,
      },
    });
    return NextResponse.json(newEmployer, { status: 201 });
  } catch (error) {
    console.log("error at register employer ", error);
  }
};
