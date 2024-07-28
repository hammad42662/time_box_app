// src/components/PriorityTasks.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { removePriorityTask } from "@/app/redux/tasksSlice";

const PriorityTasks: React.FC = () => {
  const { priorityTasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  return (
    <div className="w-full lg:w-7/12 h-full border-x border-y py-12 px-12">
      <h1 className="mb-10 text-2xl text-center font-bold">Priority Tasks</h1>
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
              Task Time
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {priorityTasks.map((task, index) => (
            <tr
              key={task._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">{task.title}</td>
              <td className="px-6 py-4">
                {new Date(task.startTime!).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => dispatch(removePriorityTask(task._id))}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove from Priority
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
