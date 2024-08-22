import { Location } from "@/app/dashboard/settings/locations/columns";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { getSlots } from "slot-calculator";
import { DateTime, Settings } from "luxon";
import utc from "dayjs/plugin/utc";
import { convertStringDurationToMinutes } from "@/lib/utils";
Settings.defaultZone = "America/Denver";

dayjs.extend(isSameOrBefore);
dayjs.extend(duration);

const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const longFormDays: any = {
  sun: "Sunday",
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
};

export async function POST(
  req: Request,
  { params }: { params: { locationId: string } }
) {
  const { locationId } = params;
  const { year, month, serviceId } = await req.json();

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });
  console.log(service);
  dayjs.extend(utc);

  const location = (await prisma.location.findUnique({
    where: {
      id: locationId,
    },
  })) as Location;

  if (!location) throw new Error("Location not found");

  const takenSlots: any = [];
  const availability: any = [];
  6;
  const date = DateTime.local(parseInt(year), parseInt(month), 1);
  const bookings = await prisma.booking.findMany({
    where: {
      service: {
        locations: {
          some: {
            id: locationId,
          },
        },
      },
      start: {
        gte: date
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          .toJSDate(),
        lte: date
          .set({ day: date.daysInMonth, hour: 23, minute: 59, second: 59 })
          .toJSDate(),
      },
    },
  });

  if (bookings.length) {
    bookings.forEach((booking: any) => {
      takenSlots.push({
        from: dayjs(booking.start).utc().local().format(),
        to: dayjs(booking.end).utc().local().format(),
      });
    });
  }

  const startOfMonth = date.startOf("month").startOf("day").startOf("minute");
  const endOfMonth = date.endOf("month").endOf("day").endOf("minute");

  // determine availability based on location hours (sunStart, sunEnd, sunClosed, monStart, monEnd, monClosed, etc)
  for (let i = 1; i < daysOfWeek.length; i++) {
    const day = daysOfWeek[i];
    if (location[`${day}Closed`]) {
      continue;
    }
    availability.push({
      day: longFormDays[day],
      from: location[`${day}Start`],
      to: location[`${day}End`],
      timezone: "America/Denver",
    });
  }

  const slots = getSlots({
    from: date
      .set({
        day: startOfMonth.day,
        hour: startOfMonth.hour,
        minute: startOfMonth.minute,
      })
      .toISO()!,
    to: date
      .set({
        day: endOfMonth.day,
        hour: endOfMonth.hour,
        minute: endOfMonth.minute,
      })
      .toISO()!,
    outputTimezone: "America/Denver",
    duration: convertStringDurationToMinutes(service!.duration),
    availability,
    unavailability: takenSlots,
  });

  return Response.json({
    availableSlots: slots.availableSlotsByDay,
  });
}
