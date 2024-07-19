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
  addPriorityTask,
} from "../redux/tasksSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BrainDump: React.FC = () => {
  const { tasks, taskInput, time, priorityTasks } = useSelector(
    (state: RootState) => state.tasks
  );
  const dispatch = useDispatch();

  const notify = (message: string) => toast(message);
  const handleAddTask = () => {
    if (tasks && time === null) {
      notify("Please Add time and task name");
    } else {
      notify("Task Added to Brain Dump");
    }
  };
  const handleAddPriorityTask = (taskTitle: string) => {
    const task = tasks.find((task) => task.title === taskTitle);

    if (task) {
      if (priorityTasks.some((pt) => pt.title === task.title)) {
        notify("Task is already in the priority list.");
      } else if (priorityTasks.length >= 3) {
        notify("Cannot add more than 3 tasks to priority.");
      } else {
        dispatch(addPriorityTask(task.title));
        notify("Task Added to Priority Tasks");
      }
    } else {
      notify("Task does not exist in the Brain Dump.");
    }
  };

  return (
    <>
      <div className="w-7/12 h-full border-x border-y py-12 px-12">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <h2 className="text-center text-2xl">Brain Dump</h2>
        <div className="flex flex-col justify-center items-center gap-4 ml-10 mt-10">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            value={taskInput}
            onChange={(e) => dispatch(setTaskInput(e.target.value))}
            placeholder="Add a task"
          />
          <div className="flex flex-row gap-4">
            <p className="text-lg">Pick a time:</p>
            <TimePicker
              className="w-36"
              onChange={(value) => {
                const dateTime = value
                  ? `${new Date().toISOString().split("T")[0]}T${value}:00`
                  : null;
                dispatch(setTime(dateTime));
              }}
              value={new Date()}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center mt-10 mb-10">
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => {
              dispatch(addTask());
              handleAddTask();
            }}
          >
            Add To Tasks
          </button>
          <button
            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => handleAddPriorityTask(taskInput)}
          >
            Add To Priority Tasks
          </button>
        </div>
        <hr />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Task Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Task Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{task.title}</td>
                  <td className="px-6 py-4">
                    {new Date(task.time!).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleAddPriorityTask(task.title)}
                      className="font-medium text-green-600 dark:text-green-500 hover:underline"
                    >
                      Add to Priority
                    </button>
                    <br />
                    <button
                      onClick={() => {
                        dispatch(deleteTask(task.title));
                        notify("Task Deleted");
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BrainDump;
