import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, phone, password, role, confirmpassword } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Create user with confirmPassword (even though it's not typically recommended)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password, // Store the password as is (consider hashing it)
        confirmpassword: confirmpassword, // Store the confirm password directly
        role,
      },
    });

    return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error during registration:", error); // More specific logging
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
