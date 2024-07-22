import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  title: string;
  startTime: string | null;
  endTime: string | null;
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
    addTask: (state) => {
      if (state.taskInput.trim() !== "" && state.startTime && state.endTime) {
        state.tasks.push({
          title: state.taskInput,
          startTime: state.startTime,
          endTime: state.endTime,
        });
        state.taskInput = "";
        state.startTime = null;
        state.endTime = null;
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
  setStartTime,
  setEndTime,
  addTask,
  deleteTask,
  addPriorityTask,
  removePriorityTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
