import dbConnect from "@/lib/dbconnect";
import { verifyToken } from "@/lib/tokenUtils";
import Task from "@/models/Tasks";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string };

    const priorityTasks = await Task.find({
      user: decoded.userId,
      priority: true,
    });

    return NextResponse.json({ priorityTasks });
  } catch (error: any) {
    console.error("Error fetching priority tasks:", error);
    return NextResponse.json(
      { error: "Error fetching priority tasks", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  await dbConnect();

  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string };

    const updates: Partial<{ priority: boolean }> = await request.json();

    if (!isValidObjectId(params.taskId)) {
      return NextResponse.json(
        { error: "Invalid Task ID format" },
        { status: 400 }
      );
    }

    const task = await Task.findOne({
      _id: params.taskId,
      user: decoded.userId,
    });
    if (!task) {
      return NextResponse.json(
        { error: "Task not found or not authorized" },
        { status: 404 }
      );
    }

    if (updates.priority !== undefined) {
      if (
        updates.priority &&
        (await Task.countDocuments({ user: decoded.userId, priority: true })) >=
          3
      ) {
        return NextResponse.json(
          { error: "Cannot add more than 3 priority tasks" },
          { status: 400 }
        );
      }
      task.priority = updates.priority;
    }

    await task.save();
    return NextResponse.json(task);
  } catch (error: any) {
    console.error("Error partially updating task:", error);
    return NextResponse.json(
      { error: "Error partially updating task", details: error.message },
      { status: 500 }
    );
  }
}
