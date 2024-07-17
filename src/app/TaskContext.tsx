import React, { createContext, useContext, useState } from "react";

// Define the context type
type TaskContextType = {
  tasks: { task: string; time: string | null }[];
  time: string | null;
  setTime: (time: string | null) => void;
  taskInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaskDelete: (taskToDelete: string) => void;
  handleAddTask: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

// Create the context with initial values
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// TaskProvider component
export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialTasks: { task: string; time: string | null }[] = [];
  const [tasks, setTasks] =
    useState<{ task: string; time: string | null }[]>(initialTasks);
  const [time, setTime] = useState<string | null>(null);
  const [taskInput, setTaskInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { task: taskInput, time }]);
      setTaskInput("");
      setTime(null);
    }
  };

  const handleTaskDelete = (taskToDelete: string) => {
    const updatedTasks = tasks.filter((t) => t.task !== taskToDelete);
    setTasks(updatedTasks);
  };

  // Provide context value to children
  const contextValue: TaskContextType = {
    tasks,
    time,
    setTime,
    taskInput,
    handleInputChange,
    handleAddTask,
    handleTaskDelete,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
}

// Custom hook to consume the context
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
