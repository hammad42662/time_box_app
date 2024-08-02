import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Task from "@/models/Tasks";
import { verifyToken } from "@/lib/tokenUtils";
import mongoose from "mongoose";

// Helper function to validate ObjectId format
function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

// Handle GET requests to retrieve a specific task by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  await dbConnect();

  try {
    // Extract and verify the token
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string };

    // Validate the taskId format
    if (!isValidObjectId(params.taskId)) {
      return NextResponse.json(
        { error: "Invalid Task ID format" },
        { status: 400 }
      );
    }

    // Find the task by ID
    const task = await Task.findOne({
      _id: params.taskId,
      user: decoded.userId,
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error: any) {
    console.error("Error retrieving task:", error);
    return NextResponse.json(
      { error: "Error retrieving task", details: error.message },
      { status: 500 }
    );
  }
}

// Handle PUT requests to update a specific task by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  await dbConnect();

  try {
    // Extract and verify the token
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string };

    // Parse the request body for task updates
    const { title, startTime, endTime } = await request.json();
    if (!title && !startTime && !endTime) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    // Validate the taskId format
    if (!isValidObjectId(params.taskId)) {
      return NextResponse.json(
        { error: "Invalid Task ID format" },
        { status: 400 }
      );
    }

    // Find and update the task
    const task = await Task.findOne({
      _id: params.taskId,
      user: decoded.userId,
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Update task fields
    if (title) task.title = title;
    if (startTime) task.startTime = new Date(startTime);
    if (endTime) task.endTime = new Date(endTime);

    await task.save();
    return NextResponse.json(task);
  } catch (error: any) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Error updating task", details: error.message },
      { status: 500 }
    );
  }
}

// Handle DELETE requests to remove a specific task by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  await dbConnect();

  try {
    // Extract and verify the token
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string };

    // Validate the taskId format
    if (!isValidObjectId(params.taskId)) {
      return NextResponse.json(
        { error: "Invalid Task ID format" },
        { status: 400 }
      );
    }

    // Find and delete the task
    const result = await Task.deleteOne({
      _id: params.taskId,
      user: decoded.userId,
    });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Error deleting task", details: error.message },
      { status: 500 }
    );
  }
}
