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
import { title } from "process";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BrainDump: React.FC = () => {
  const { tasks, taskInput, time } = useSelector(
    (state: RootState) => state.tasks
  );
  const dispatch = useDispatch();
  console.log(tasks, taskInput, title);
  const notify = () => toast("Task Added");
  return (
    <>
      <div className=" w-7/12 h-full border-x border-y py-12 px-12">
        <h2 className="text-center text-2xl">Brain Dump</h2>
        <div className="flex flex-col justify-center items-center gap-4 ml-10  mt-10">
          <input
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={taskInput}
            onChange={(e) => dispatch(setTaskInput(e.target.value))}
            placeholder="Add a task"
          />
          <div className=" flex flex-row gap-4">
            <p className="text-lg ">Pick a time:</p>
            <TimePicker
              className=" w-36 "
              onChange={(value) => {
                const dateTime = value ? `2024-07-19T${value}:00` : null;
                dispatch(setTime(dateTime));
              }}
              value={
                time
                  ? new Date(time).toTimeString().substring(0, 5)
                  : new Date()
              }
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center mt-10 mb-10">
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              dispatch(addTask());
              notify();
            }}
          >
            Add To Tasks
          </button>
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
            theme="light"
          />
          <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
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
                      onClick={() => dispatch(deleteTask(task.title))}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Add to Priority
                    </button>
                    <br />
                    <button
                      onClick={() => dispatch(deleteTask(task.title))}
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
