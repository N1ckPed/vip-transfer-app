// src/components/AdminCalendar.jsx
import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AdminCalendar = ({ bookings, onEventClick }) => {
  const getStatus = (datetime) => {
    const now = new Date();
    const bookingTime = new Date(datetime);
    return bookingTime > now ? 'upcoming' : 'done';
  };

const events = bookings
  .filter((b) => b.datetime && !isNaN(Date.parse(b.datetime)))
  .map((b) => {
    const start = new Date(b.datetime);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    return {
      title: `${b.vehicle || "Taxi"} - ${b.name || "No Name"}`,
      start,
      end,
      status: b.status || getStatus(start),
      resource: b,
    };
  });


  const eventStyleGetter = (event) => {
    let bgColor = '#ccc';
    if (event.status === 'upcoming') bgColor = '#bbf7d0';
    else if (event.status === 'done') bgColor = '#e5e7eb';
    else if (event.status === 'cancelled') bgColor = '#fecaca';

    return {
      style: {
        backgroundColor: bgColor,
        borderRadius: '4px',
        padding: '4px',
        color: '#000',
        border: 'none',
        fontSize: '0.85rem',
      },
    };
  };

  console.log("📅 Events for calendar rendering:", events); // <- LOG THIS TO CONFIRM

  return (
    <div className="p-4 bg-white shadow rounded overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">📅 Admin Booking Calendar</h2>
      <div className="min-w-[300px] md:min-w-full">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => onEventClick(event.resource)}
          popup
          views={['day', 'week', 'month']}
          defaultView="month"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default AdminCalendar;