import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Task from "@/models/Tasks";

export async function DELETE(request: Request, context: any) {
  try {
    await dbConnect();

    const { taskId } = context.params;

    if (!taskId) {
      return NextResponse.json(
        { error: "No task ID provided" },
        { status: 400 }
      );
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (deletedTask) {
      return NextResponse.json({
        message: "Task deleted successfully",
        task: deletedTask,
      });
    } else {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Error deleting task", details: error },
      { status: 500 }
    );
  }
}
