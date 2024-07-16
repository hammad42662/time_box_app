"use client";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useTaskContext } from "../TaskContext";
export default function BrainDump() {
  const { tasks, time, setTime, handleAddTask, taskInput, handleInputChange } =
    useTaskContext();

  return (
    <div className="w-auto h-full bg-red-200">
      <h2 className="text-center">Brain Dump</h2>
      <div className="flex flex-row ml-10">
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Add a task"
        />
        <TimePicker className="ml-10" onChange={setTime} value={time} />
      </div>
      <div className="flex flex-col justify-start items-center">
        <button onClick={handleAddTask}>Add To Tasks</button>
        <button>Add To Priority Tasks</button>
      </div>
      <hr />
      <div className="bg-red">
        {tasks.map((task, index) => (
          <div key={index} className="flex flex-row gap-1">
            {index + 1}: <p>{task}</p> <p>{time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
