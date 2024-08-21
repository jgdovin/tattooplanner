"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";

export default function Client() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/booking")
      .then(async (data) => {
        const bookings = await data.json();
        console.log(bookings);
        const events = bookings.map((booking: any) => ({
          title: booking.customer.name,
          start: booking.start,
          end: booking.end,
        }));
        setEvents(events);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="h-full">
      <FullCalendar
        height="100%"
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
      />
    </div>
  );
}
