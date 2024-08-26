"use client";

import { useSelector, useDispatch } from "react-redux";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import "react-clock/dist/Clock.css";
import {
  addTask,
  deleteTask,
  setTaskInput,
  setStartTime,
  setEndTime,
  addPriorityTask,
  setTasks,
  setPriorityTasks,
} from "@/app/redux/tasksSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "@/app/redux/store";
import axios from "axios";
import { useState, useEffect } from "react";

export default function BrainDump() {
  const { tasks, taskInput, startTime, endTime, priorityTasks } = useSelector(
    (state: RootState) => state.tasks
  );
  const dispatch = useDispatch();
  const [userTasks, setUserTasks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const notify = (message: string) => toast(message);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get("/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const tasks = response.data.tasks;
          setUserTasks(tasks);
          dispatch(setTasks(tasks));
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch tasks");
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleAddTask = async () => {
    if (taskInput.trim() === "" || !startTime || !endTime) {
      notify("Please Add start time, end time, and task name");
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        "/api/tasks",
        {
          title: taskInput,
          startTime,
          endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newTask = response.data;
      dispatch(addTask(newTask));
      setUserTasks((prevTasks) => [...prevTasks, newTask]);
      notify("Task Added to Brain Dump");
    } catch (error) {
      console.error(error);
      notify("Error adding task");
    }
  };

  const handleAddPriorityTask = async (taskId: string) => {
    const task = userTasks.find((task) => task._id === taskId);

    if (task) {
      if (priorityTasks.some((pt) => pt._id === task._id)) {
        notify("Task is already in the priority list.");
      } else if (priorityTasks.length >= 3) {
        notify("Cannot add more than 3 tasks to priority.");
      } else {
        try {
          const token = localStorage.getItem("authToken");
          if (!token) {
            throw new Error("No authentication token found");
          }

          const response = await axios.patch(
            `/api/tasks/${taskId}/priority`,
            { priority: true },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            dispatch(addPriorityTask({ ...task, priority: true }));
            setUserTasks((prevTasks) =>
              prevTasks.map((t) =>
                t._id === task._id ? { ...t, priority: true } : t
              )
            );
            notify("Task Added to Priority Tasks");
          } else {
            notify("Failed to add task to priority");
          }
        } catch (error) {
          console.error("Error adding task to priority:", error);
          notify("Error adding task to priority");
        }
      }
    } else {
      notify("Task does not exist in the Brain Dump.");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(deleteTask(id));
      setUserTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      notify("Task Deleted");
    } catch (error) {
      console.error("Error deleting task:", error);
      notify("Error deleting task");
    }
  };

  const handleStartTimeChange = (value: any) => {
    const dateTime = value
      ? `${new Date().toISOString().split("T")[0]}T${value}:00`
      : null;
    dispatch(setStartTime(dateTime));
  };

  const handleEndTimeChange = (value: any) => {
    const dateTime = value
      ? `${new Date().toISOString().split("T")[0]}T${value}:00`
      : null;
    dispatch(setEndTime(dateTime));
  };

  return (
    <>
      <div className=" w-full md:w-full h-full border-x border-y shadow-xl shadow-blue-100 ">
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
        <h2 className="mb-10 text-xl text-center font-bold py-2 text-blue-500">
          Brain Dump
        </h2>
        <div className="flex flex-col justify-center items-center gap-4 ml-10 mt-10">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            value={taskInput}
            onChange={(e) => dispatch(setTaskInput(e.target.value))}
            placeholder="Add a task"
            maxLength={20}
          />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className=" flex flex-row justify-center items-center gap-2">
              <p className="text-sm w-36 font-bold">Start Time</p>{" "}
              <span>:</span>
              <TimePicker
                className="w-full bg-blue-50 text-zinc-600"
                onChange={handleStartTimeChange}
                value={
                  startTime
                    ? new Date(startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : null
                }
                format="h:mm a"
              />
            </div>
            <div className=" flex flex-row justify-center items-center gap-2">
              <p className="text-sm w-36 font-bold">End Time</p> <span>:</span>
              <TimePicker
                className="w-full bg-blue-50 text-zinc-600 "
                disableClock={false}
                onChange={handleEndTimeChange}
                value={
                  endTime
                    ? new Date(endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : null
                }
                format="h:mm a"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center mt-10 mb-10">
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-normal text-sm rounded-lg  px-4 py-2 me-2 mb-2"
            onClick={handleAddTask}
          >
            Add To Tasks
          </button>
        </div>
        <hr />
        <div className=" w-full relative  shadow-md sm:rounded-lg">
          <table className=" table-fixed border-spacing-y-20  w-full  text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Task Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Task Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Time
                </th>
                <th scope="col" className="px-6 py-3">
                  End Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={task._id}
                  className="odd:bg-white  even:bg-gray-50 border-b "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{task.title}</td>
                  <td className="px-6 py-4">
                    {task.startTime
                      ? new Date(task.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {task.endTime
                      ? new Date(task.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleAddPriorityTask(task._id)}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-normal text-sm rounded-lg  px-4 py-2 me-2 mb-2"
                    >
                      <IoAddCircle />
                    </button>

                    <br />
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal  text-sm rounded-lg  px-4 py-2 me-2 mb-2 "
                    >
                      <MdDelete />
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
}
