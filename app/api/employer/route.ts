import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import ValidateEmployer from "../../validationSchema/employerSchemaValidator";
import cloudinary from "@/app/utils/cloudinary";

interface FieldValue {
  [key: string]: string;
}
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log(body, " image ", body);
  try {
    const newEmployer = await prisma?.employer.create({
      data: {
        companyName: body.companyName,
        address: body.address,
        logo: body.newImage,
        email: body.email,
      },
    });
    return NextResponse.json(newEmployer, { status: 201 });
  } catch (error) {
    console.log("error at register employer ", error);
    return NextResponse.json("unkown error", { status: 500 });
  }
};
