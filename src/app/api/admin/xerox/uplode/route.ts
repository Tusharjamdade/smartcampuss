import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const colour = formData.get("colour")?.toString() || "black-white";
    const format = formData.get("format")?.toString() || "single-sided";
    const userIdString = formData.get("userId")?.toString();
    const userId = userIdString ? parseInt(userIdString, 10) : NaN;

    if (!file) {
      return NextResponse.json({ msg: "No file uploaded." }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ msg: "Invalid file type. Only PDFs are allowed." }, { status: 400 });
    }

    if (isNaN(userId)) {
      return NextResponse.json({ msg: "Invalid user ID." }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const printJob = await prisma.printJob.create({
      data: {
        document: fileBuffer,
        isCompleted: false,
        format,
        colour,
        userId,
      },
    });

    return NextResponse.json(
      { msg: "Print job submitted successfully!", printJob },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling print job submission:", error);
    return NextResponse.json({ msg: "Error processing request" }, { status: 500 });
  }
}
