"use client";

import { getArtistBookings } from "@/actions/booking";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Client() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getArtistBookings()
      .then(async (data) => {
        const bookings = await data;
        console.log(bookings);
        if (!bookings) {
          setEvents([]);
          return;
        }
        const events = bookings.map((booking: any) => ({
          title: booking.customer.name,
          start: booking.start,
          end: booking.end,
          editable: true,
          extendedProps: {
            description: booking.service.name,
          },
          //TODO: add url to booking information (part of FC api)
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
        eventContent={function (arg: any) {
          const start = dayjs(arg.event.start).format("h:mm");
          const end = dayjs(arg.event.end).format("h:mm");

          return {
            html: `
              <div>
                <div class="text-xs">${start} - ${end}</div>
                <div class="text-xs">${arg.event.title}</div>
                <div class="text-xs">${arg.event.extendedProps.description}</div>
              </div>
            `,
          };
        }}
        events={events}
      />
    </div>
  );
}
