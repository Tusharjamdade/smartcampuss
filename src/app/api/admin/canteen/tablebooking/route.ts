import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, name, selectedSeats } = await req.json();

    if (!userId || !name || !selectedSeats) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store booking data in the database
    const newBooking = await prisma.tableBookings.create({
      data: {
        userId,
        name,
        selectedSeats, // Store the serialized JSON string of selected seats
      },
    });

    return NextResponse.json({ message: "Seats booked successfully", newBooking }, { status: 201 });
  } catch (error) {
    console.error("Error booking seats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
