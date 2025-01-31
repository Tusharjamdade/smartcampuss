import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Fetch the canteen data from the database
    const canteens = await prisma.canteenStore.findMany({
      include: {
        menu: true, // Include menu items, if needed
      },
    });

    // Return the fetched data as a JSON response
    return NextResponse.json(canteens, { status: 200 });
  } catch (error) {
    console.error("Error fetching canteens:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
