"use server";
import prisma from "@/lib/prisma";
import { convertStringDurationToMinutes } from "@/lib/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export async function createBooking({
  date,
  serviceId,
  locationId,
}: {
  date: Date;
  serviceId: string;
  locationId: string;
}) {
  dayjs.extend(utc);
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }
  const bookingDateStart = dayjs(date).set("second", 0).utc();
  const duration = convertStringDurationToMinutes(service.duration);
  const bookingDateEnd = bookingDateStart.add(duration, "minute");

  const booking = {
    start: bookingDateStart.toISOString(),
    end: bookingDateEnd.toISOString(),
    service: {
      connect: {
        id: serviceId,
      },
    },
    location: {
      connect: {
        id: locationId,
      },
    },
    customer: {
      connect: {
        id: "cm02ip3i4000lev3qc4666h71",
      },
    },
  };

  const res = await prisma.booking.create({
    data: booking,
  });

  return res;
}
