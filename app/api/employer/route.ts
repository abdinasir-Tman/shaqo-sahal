import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export const POST = async(req: NextRequest)=>{
         if(req.headers.get("content-length") === "0") return NextResponse.json({error: "please insert the body some info"},{status: 400});

         const body = await req.json();
         const newEmployer = 
}