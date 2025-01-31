import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ msg: "Invalid ID" }, { status: 400 });
    }

    // Fetch the print job from the database
    const printJob = await prisma.printJob.findUnique({
      where: { id },
    });

    if (!printJob) {
      return NextResponse.json({ msg: "File not found" }, { status: 404 });
    }

    // Send the PDF file as a downloadable response
    return new NextResponse(printJob.document, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=print_job_${id}.pdf`,
      },
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return NextResponse.json({ msg: "Error retrieving file" }, { status: 500 });
  }
}
