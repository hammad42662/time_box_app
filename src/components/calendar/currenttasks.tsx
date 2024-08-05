import React, { useEffect, useMemo } from "react";
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

  const events = useMemo(() => {
    const isValidDate = (date: any) =>
      date ? !isNaN(Date.parse(date)) : false;

    const allTasks = [...tasks, ...priorityTasks];

    return allTasks
      .filter(
        (task) =>
          task.startTime &&
          task.endTime &&
          isValidDate(task.startTime) &&
          isValidDate(task.endTime)
      )
      .map((task) => {
        const startTime = task.startTime
          ? new Date(task.startTime).toISOString()
          : "";
        const endTime = task.endTime
          ? new Date(task.endTime).toISOString()
          : "";
        const isPriority = priorityTasks.some(
          (priorityTask) => priorityTask._id === task._id
        );

        return {
          title: task.title,
          start: startTime,
          end: endTime,
          id: task._id,
          color: isPriority ? "green" : "blue",
        };
      });
  }, [tasks, priorityTasks]);

  useEffect(() => {
    console.log("Events for FullCalendar:", events);
  }, [events]);

  return (
    <div className="calendar-container -mt-36 mb-20">
      <FullCalendar
        height={500}
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
