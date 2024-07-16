import { useTaskContext } from "../TaskContext";

export default function CurrentTasks() {
  const { tasks, time, setTime, handleAddTask, taskInput, handleInputChange } =
    useTaskContext();
  return <div className=" w-9/12 h-full">{tasks}</div>;
}
