import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, storeName, address } = await req.json();

    // Validate input
    if (!userId || isNaN(Number(userId))) {
      return NextResponse.json({ error: "Valid User ID is required" }, { status: 400 });
    }
    if (!storeName?.trim() || !address?.trim()) {
      return NextResponse.json({ error: "Store name and address are required" }, { status: 400 });
    }

    // Create Xerox shop entry
    const xeroxShop = await prisma.xeroxStore.create({
      data: {
        storeName,
        location: address,
        userId: Number(userId),
      },
    });

    return NextResponse.json(xeroxShop, { status: 201 });
  } catch (error: any) {
    // console.error("Error creating XeroxStore:", error);

    if (error.code === "P2002") {
      return NextResponse.json({ error: "Store already exists" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function GET() {
    try {
      // Fetch all Xerox shops with user details
      const xeroxShops = await prisma.xeroxStore.findMany({
        include: {
          user: true, // Fetch associated user details
        },
      });
  
      return NextResponse.json({ success: true, data: xeroxShops }, { status: 200 });
    } catch (error: any) {
      console.error("Error fetching Xerox Stores:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }