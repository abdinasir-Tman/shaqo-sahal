import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import ValidateEmployer from "../../validationSchema/employerSchemaValidator";
import cloudinary from "@/app/utils/cloudinary";

interface FieldValue {
  [key: string]: string;
}
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const newEmployer = await prisma?.employer.create({
      data: {
        companyName: body.companyName,
        address: body.address,
        logo: body.newImage,
        email: body.email,
      },
    });
    if (!newEmployer) return NextResponse.json("error", { status: 500 });

    await prisma.user.update({
      data: {
        type: "employer",
      },
      where: {
        email: body.email,
      },
    });
    return NextResponse.json(newEmployer, { status: 201 });
  } catch (error) {
    console.log("error at register employer ", error);
    return NextResponse.json("unkown error", { status: 500 });
  }
};
// export const PATCH = async (req: NextRequest,{params : {params : string}})=>{
//       const body = await req.json();

// }
