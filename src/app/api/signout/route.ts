import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ message: "Sign-out successful" });

    response.cookies.delete("authToken");

    return response;
  } catch (err: any) {
    console.error("Error during sign-out:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
