import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


function MyCalendar() {
  const events = [
    { title: 'Event 1', date: '2023-04-03' },
    { title: 'Event 2', date: '2023-04-05' }
  ];

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
}

export default MyCalendar;