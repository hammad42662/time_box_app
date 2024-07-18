"use client";
// src/components/BrainDump.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import { RootState } from "../redux/store";
import {
  addTask,
  deleteTask,
  setTaskInput,
  setTime,
} from "../redux/tasksSlice";

const BrainDump: React.FC = () => {
  const { tasks, taskInput, time } = useSelector(
    (state: RootState) => state.tasks
  );
  const dispatch = useDispatch();

  return (
    <div className="w-auto h-full bg-red-200">
      <h2 className="text-center">Brain Dump</h2>
      <div className="flex flex-row ml-10">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => dispatch(setTaskInput(e.target.value))}
          placeholder="Add a task"
        />
        <TimePicker
          className="ml-10"
          onChange={(value) => {
            const dateTime = value ? `2024-07-18T${value}:00` : null;
            dispatch(setTime(dateTime));
          }}
          value={time ? new Date(time).toTimeString().substring(0, 5) : ""}
        />
      </div>
      <div className="flex flex-col justify-start items-center">
        <button onClick={() => dispatch(addTask())}>Add To Tasks</button>
        <button>Add To Priority Tasks</button>
      </div>
      <hr />
      <div className="bg-red">
        {tasks.map((task, index) => (
          <div key={index} className="flex flex-row gap-1">
            {index + 1}: <p>{task.title}</p>{" "}
            <p>{new Date(task.time!).toLocaleTimeString()}</p>
            <button
              className="bg-red"
              onClick={() => dispatch(deleteTask(task.title))}
            >
              -Delete Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrainDump;
