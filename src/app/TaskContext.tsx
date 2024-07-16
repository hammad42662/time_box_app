import React, { createContext, useContext, useState } from "react";

// Define the context type
type TaskContextType = {
  tasks: string[];
  time: string | null;
  setTime: any;
  taskInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  const initialTasks: string[] = [];
  const [tasks, setTasks] = useState<string[]>(initialTasks);
  const [time, setTime] = useState<string | null>("10:00");
  const [taskInput, setTaskInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (taskInput.trim() !== "") {
      setTasks([...tasks, taskInput]);
      setTaskInput("");
    }
  };

  // Provide context value to children
  const contextValue: TaskContextType = {
    setTime,
    tasks,
    time,
    taskInput,
    handleInputChange,
    handleAddTask,
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
