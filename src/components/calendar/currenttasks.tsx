import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export default function CurrentTasks() {
  const { tasks, priorityTasks } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    console.log("Tasks from Redux store:", tasks);
    console.log("Priority tasks from Redux store:", priorityTasks);
  }, [tasks, priorityTasks]);

  const isValidDate = (date: any) => {
    return !isNaN(Date.parse(date));
  };

  const events = tasks
    .filter(
      (task) =>
        task.startTime &&
        task.endTime &&
        isValidDate(task.startTime) &&
        isValidDate(task.endTime)
    )
    .map((task, index) => {
      const startTime = new Date(task.startTime!).toISOString();
      const endTime = new Date(task.endTime!).toISOString();
      const isPriority = priorityTasks.some(
        (priorityTask) => priorityTask.title === task.title
      );
      console.log(
        `Task ${index}:`,
        task.title,
        startTime,
        endTime,
        isPriority ? "Green" : "Blue"
      );
      return {
        title: task.title,
        start: startTime,
        end: endTime,
        id: index.toString(),
        color: isPriority ? "green" : "blue",
      };
    });

  useEffect(() => {
    console.log("Calendar events:", events); // Debugging log
  }, [events]);

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridDay"
        nowIndicator={true}
        editable={false}
        selectable={true}
        selectMirror={true}
        headerToolbar={{
          start: "title",
          center: "",
          end: "",
        }}
        stickyFooterScrollbar={false}
        handleWindowResize={true}
        themeSystem="bootstrap"
        events={events}
      />
    </div>
  );
}
