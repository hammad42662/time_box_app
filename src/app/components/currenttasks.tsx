import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function CurrentTasks() {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    console.log("Tasks from Redux store:", tasks);
  }, [tasks]);

  const isValidDate = (date: any) => {
    return !isNaN(Date.parse(date));
  };

  const events = tasks
    .filter((task) => task.time && isValidDate(task.time))
    .map((task, index) => {
      const eventTime = new Date(task.time!).toISOString(); // Ensure this format is correct for FullCalendar
      console.log(`Task ${index}:`, task.title, eventTime);
      return {
        title: task.title,
        start: eventTime,
        id: index.toString(),
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
        events={events}
      />
    </div>
  );
}
