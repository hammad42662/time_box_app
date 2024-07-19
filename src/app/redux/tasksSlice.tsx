// src/redux/tasksSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  title: string;
  time: string | null;
}

interface TasksState {
  tasks: Task[];
  priorityTasks: Task[];
  taskInput: string;
  time: string | null;
}

const initialState: TasksState = {
  tasks: [],
  priorityTasks: [],
  taskInput: "",
  time: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskInput: (state, action: PayloadAction<string>) => {
      state.taskInput = action.payload;
    },
    setTime: (state, action: PayloadAction<string | null>) => {
      state.time = action.payload
        ? new Date(action.payload).toISOString()
        : null;
    },
    addTask: (state) => {
      if (state.taskInput.trim() !== "" && state.time) {
        state.tasks.push({ title: state.taskInput, time: state.time });
        state.taskInput = "";
        state.time = null;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.title !== action.payload);
      state.priorityTasks = state.priorityTasks.filter(
        (task) => task.title !== action.payload
      );
    },
    addPriorityTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.title === action.payload);

      // Check if the task is already in the priority list
      if (
        task &&
        !state.priorityTasks.some(
          (priorityTask) => priorityTask.title === task.title
        )
      ) {
        // Check if the priority tasks list is less than 3
        if (state.priorityTasks.length < 3) {
          state.priorityTasks.push(task);
        } else {
          console.log("Cannot add more than 3 tasks to priority.");
        }
      } else {
        console.log("Task is already in the priority list.");
      }
    },
    removePriorityTask: (state, action: PayloadAction<string>) => {
      state.priorityTasks = state.priorityTasks.filter(
        (task) => task.title !== action.payload
      );
    },
  },
});

export const {
  setTaskInput,
  setTime,
  addTask,
  deleteTask,
  addPriorityTask,
  removePriorityTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
