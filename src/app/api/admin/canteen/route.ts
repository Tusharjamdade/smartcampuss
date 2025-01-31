import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, storeName, location, menu } = await req.json();

    // Validate required fields
    if (!userId || !storeName || !location || !Array.isArray(menu)) {
      return NextResponse.json(
        { error: "Missing required fields or invalid menu format" },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Create CanteenStore along with Menu items
    const canteen = await prisma.canteenStore.create({
      data: {
        storeName,
        location,
        userId, // Ensure userId is an integer
        menu: {
          create: menu.map((menuItem) => ({
            item: menuItem.item,
            price: menuItem.price.toString(), // Ensure price is a string
          })),
        },
      },
      include: { menu: true }, // Include menu items in the response
    });

    return NextResponse.json({ message: "Canteen created successfully", canteen }, { status: 201 });
  } catch (error) {
    console.error("Error creating Canteen:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
