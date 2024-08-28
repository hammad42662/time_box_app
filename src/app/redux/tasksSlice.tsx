import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  _id: string;
  title: string;
  startTime: string | null;
  endTime: string | null;
  user: string;
  priority: boolean;
}

interface TasksState {
  tasks: Task[];
  priorityTasks: Task[];
  taskInput: string;
  startTime: string | null;
  endTime: string | null;
}

const initialState: TasksState = {
  tasks: [],
  priorityTasks: [],
  taskInput: "",
  startTime: null,
  endTime: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskInput: (state, action: PayloadAction<string>) => {
      state.taskInput = action.payload;
    },
    setStartTime: (state, action: PayloadAction<string | null>) => {
      state.startTime = action.payload
        ? new Date(action.payload).toISOString()
        : null;
    },
    setEndTime: (state, action: PayloadAction<string | null>) => {
      state.endTime = action.payload
        ? new Date(action.payload).toISOString()
        : null;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      state.taskInput = "";
      state.startTime = null;
      state.endTime = null;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      state.priorityTasks = state.priorityTasks.filter(
        (task) => task._id !== action.payload
      );
    },
    addPriorityTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;

      if (
        !state.priorityTasks.some(
          (priorityTask) => priorityTask._id === task._id
        )
      ) {
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
        (task) => task._id !== action.payload
      );
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setPriorityTasks: (state, action: PayloadAction<Task[]>) => {
      state.priorityTasks = action.payload;
    },
  },
});

export const {
  setTaskInput,
  setStartTime,
  setEndTime,
  addTask,
  deleteTask,
  addPriorityTask,
  removePriorityTask,
  setTasks,
  setPriorityTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
