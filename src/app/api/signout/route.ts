import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Create response for successful sign-out
    const response = NextResponse.json({ message: "Sign-out successful" });

    // Clear authentication-related cookies or headers
    response.cookies.delete("authToken");

    return response;
  } catch (err: any) {
    console.error("Error during sign-out:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
