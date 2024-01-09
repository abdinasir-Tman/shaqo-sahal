import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/app/utils/cloudinary";

interface FieldValue {
  [key: string]: string;
}
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();

  const oldEmployer: any = await prisma.employer.findFirst({
    where: {
      id: params.id,
    },
  });

  await cloudinary.uploader.destroy(oldEmployer?.logo?.public_id);

  try {
    const updatedEmployer = await prisma?.employer.update({
      data: {
        companyName: body.companyName,
        address: body.address,
        logo: {
          url: body.newImage.url,
          public_id: body.newImage.public_id,
        },
        email: body.email,
      },
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(updatedEmployer, { status: 201 });
  } catch (error) {
    console.log("error at register employer ", error);
    return NextResponse.json("unkown error", { status: 500 });
  }
};
// export const PATCH = async (req: NextRequest,{params : {params : string}})=>{
//       const body = await req.json();

// }
