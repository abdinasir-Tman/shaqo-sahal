import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import ValidateEmployer from "../../validationSchema/employerSchemaValidator";
import cloudinary from "@/app/utils/cloudinary";

interface FieldValue {
  [key: string]: string;
}
export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  console.log("form data ", formData);
  const fields: FieldValue = {};
  let file: any = "";
  for (const [key, value] of formData) {
    if (key.startsWith("newImage") && typeof value === "string") {
    } else if (typeof value === "string") {
      fields[key] = value;
    }
  }
  console.log(fields, " image ", file);
  try {
    const newEmployer = await prisma?.employer.create({
      data: {
        companyName: fields.companyName,
        address: fields.address,
        logo: "somethin",
        email: fields.email,
      },
    });
    return NextResponse.json(newEmployer, { status: 201 });
  } catch (error) {
    console.log("error at register employer ", error);
  }
};
