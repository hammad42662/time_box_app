import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Clear cookies or tokens for sign-out
    const response = NextResponse.json({ message: "Sign-out successful" });

    // Clear authentication-related cookies or headers
    // Adjust the cookie name according to your implementation
    response.cookies.delete("authToken");

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
