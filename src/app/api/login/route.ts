import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/tokenUtils";
import dbConnect from "@/lib/dbconnect";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { email, username, password } = await request.json();

    if ((!email && !username) || !password) {
      return NextResponse.json(
        { error: "Username or email and password are required" },
        { status: 400 }
      );
    }

    // Search for user by email or username
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found, try logging in with email." },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    const token = generateToken(user._id.toString());

    return NextResponse.json({ message: "Login successful", token });
  } catch (err: any) {
    console.error("Error during login:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
