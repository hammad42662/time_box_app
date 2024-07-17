import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useTaskContext } from "../TaskContext";

import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
export default function CurrentTasks() {
  const {
    tasks,
    time,
    handleTaskDelete,
    setTime,
    handleAddTask,
    taskInput,
    handleInputChange,
  } = useTaskContext();
  const initialEvents = tasks.map((task, index) => {
    title: task.task; // Assuming 'tasks' is the task title
    start: task.time; // Assuming 'time' is the start time
    resourceId: index.toString(); // Using index as resourceId, convert to string
  });
  function handleCalendarTask() {}
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        initialView="timeGridDay"
        nowIndicator={true}
        editable={false}
        selectable={true}
        selectMirror={true}
        resources={[
          { id: "a", title: "Auditorium A" },
          { id: "b", title: "Auditorium B", eventColor: "green" },
          { id: "c", title: "Auditorium C", eventColor: "orange" },
        ]}
        initialEvents={[{ initialEvents }]}
      />
    </div>
  );
}
