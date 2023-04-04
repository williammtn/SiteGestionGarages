import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import "../App.css";

function MyCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/appointment")
      .then((response) => {
        const formattedEvents = response.data.map((event) => ({
          title: event.appointment_name,
          start: event.appointment_date,
          end: event.appointment_date,
          allDay: false,
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      editable={true}
      events={events}
    />
  );
}

export default MyCalendar;
