import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/tokenUtils";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token) as { userId: string };

    console.log("Token is valid:", decoded);

    return NextResponse.json({ message: "Token is valid" });
  } catch (err: any) {
    console.error("Token verification failed:", err);
    return NextResponse.json(
      { error: "Invalid token", details: err.message },
      { status: 401 }
    );
  }
}
