"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { removePriorityTask, setPriorityTasks } from "@/app/redux/tasksSlice";
import axios from "axios";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";

const PriorityTasks: React.FC = () => {
  const { priorityTasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPriorityTasks = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get("/api/tasks/[taskId]/priority", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          dispatch(setPriorityTasks(response.data.priorityTasks));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPriorityTasks();
  }, [dispatch]);

  return (
    <div className="w-full lg:w-7/12 h-full border-x border-y rounded-3xl shadow-xl shadow-blue-100 py-12 px-12 bg-transparent">
      <h1 className="mb-10 text-xl text-center font-bold text-zinc-600 opacity-50">
        Priority Tasks
      </h1>
      <table className="  table-fixed border-spacing-y-20  w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Task Number
            </th>
            <th scope="col" className="px-6 py-3">
              Task Name
            </th>
            <th scope="col" className="px-6 py-3">
              Task Time
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {priorityTasks.map((task, index) => (
            <tr key={task._id} className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">{task.title}</td>
              <td className="px-6 py-4">
                {task.startTime
                  ? new Date(task.startTime).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "No start time"}
                -
                {task.endTime
                  ? new Date(task.endTime).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "No End time"}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => dispatch(removePriorityTask(task._id))}
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
  );
};

export default PriorityTasks;
