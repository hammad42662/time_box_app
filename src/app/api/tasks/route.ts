import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Task from "@/models/Tasks";
import { verifyToken } from "@/lib/tokenUtils";
import mongoose from "mongoose";

// Helper function to validate ObjectId format
function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

// Handle POST requests to create a new task
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    // Extract and verify the token
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string };

    // Validate the userId format
    if (!isValidObjectId(decoded.userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Parse the request body for task details
    const { title, startTime, endTime } = await request.json();
    if (!title || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Missing task details" },
        { status: 400 }
      );
    }

    // Validate date format
    if (
      isNaN(new Date(startTime).getTime()) ||
      isNaN(new Date(endTime).getTime())
    ) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    // Create and save the new task
    const newTask = new Task({
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      user: decoded.userId,
    });

    await newTask.save();

    return NextResponse.json(newTask);
  } catch (err: any) {
    console.error("Error creating task:", err); // Log the error for debugging
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}

// Handle GET requests to retrieve all tasks for the authenticated user
export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string };

    if (!isValidObjectId(decoded.userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const tasks = await Task.find({ user: decoded.userId }); // Ensure tasks are user-specific
    return NextResponse.json({ tasks });
  } catch (error: any) {
    console.error("Error retrieving tasks:", error);
    return NextResponse.json(
      { error: "Error retrieving tasks", details: error.message },
      { status: 500 }
    );
  }
}
