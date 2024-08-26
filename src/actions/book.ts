"use server";
import prisma from "@/lib/prisma";
import { convertStringDurationToMinutes } from "@/lib/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export async function createBooking({
  date,
  serviceId,
  locationId,
  customerId,
}: {
  date: Date;
  serviceId: string;
  locationId: string;
  customerId: string;
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
  console.log(customerId);
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
        id: customerId,
      },
    },
  };

  const res = await prisma.booking.create({
    data: booking,
  });

  return res;
}
