import dbConnect from "@/lib/dbconnect";
import Task from "@/models/Tasks";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const tasks = await Task.find({});
    return NextResponse.json(tasks);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { title, startTime, endTime } = await request.json();

    const newTask = new Task({
      name: title,
      startTime,
      endTime,
    });

    await newTask.save();

    return NextResponse.json(newTask);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export async function DELETE() {
  await dbConnect();
  try {
    Task.deleteOne({});
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
