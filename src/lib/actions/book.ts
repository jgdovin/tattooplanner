"use server";
import prisma from "@/lib/prisma";
import { convertStringDurationToMinutes, getMissingDates } from "@/lib/utils";
import { LocationType } from "@/features/locations/schemas/locations";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getSlots } from "slot-calculator";
// import { sendEmail } from "./mailer";
// import { getLocation } from "./location";
import { getBooking } from "./booking";
import { getTemplate } from "./emailTemplate";

export async function getLocationsArtistId(locationId: string) {
  const location = await prisma.location.findUnique({
    where: {
      id: locationId,
    },
    include: {
      user: true,
    },
  });

  if (!location) {
    throw new Error("Location not found");
  }

  return location.user.id;
}

export async function getCustomerForBooking(customerId: string) {
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
}

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

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  const location = await prisma.location.findUnique({
    where: {
      id: locationId,
    },
    select: {
      email: true,
    },
  });

  if (!location) {
    throw new Error("Location not found");
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
        id: customerId,
      },
    },
  };

  const res = await prisma.booking.create({
    data: booking,
  });

  sendConfirmationEmail({
    customerId: customer.id,
    bookingId: res.id,
    locationId,
  });

  return res;
}

export async function getLocationServices(locationId: string) {
  const services = await prisma.service.findMany({
    where: {
      deleted: false,
      locations: {
        some: {
          id: locationId,
        },
      },
    },
  });

  if (!services) {
    throw new Error("Location not found");
  }

  return services;
}

export async function getLocationAvailability(locationId: string, body: any) {
  const { year, month, serviceId } = body;

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  dayjs.extend(utc);

  const location = (await prisma.location.findUnique({
    where: {
      id: locationId,
    },
  })) as LocationType;

  if (!location) throw new Error("Location not found");

  const takenSlots: any = [];
  const availability: any = [];
  6;

  const startOfMonth = dayjs()
    .set("year", parseInt(year))
    .set("month", parseInt(month) - 1)
    .startOf("month")
    .startOf("day")
    .startOf("minute");
  const endOfMonth = dayjs()
    .set("year", parseInt(year))
    .set("month", parseInt(month) - 1)
    .endOf("month")
    .endOf("day")
    .endOf("minute");

  const date = dayjs()
    .set("year", parseInt(year))
    .set("month", parseInt(month) - 1)
    .set("date", 1);
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
        gte: startOfMonth.toDate(),
        lte: endOfMonth.toDate(),
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

  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

  const longFormDays: any = {
    sun: "Sunday",
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
  };

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
    from: startOfMonth.toISOString(),
    to: endOfMonth.toISOString(),
    outputTimezone: "America/Denver",
    duration: convertStringDurationToMinutes(service!.duration),
    availability,
    unavailability: takenSlots,
  });

  const getDisabledDaysOfWeek = (location: LocationType) => {
    const disabledDays = [];
    for (let i = 0; i < daysOfWeek.length; i++) {
      const day = daysOfWeek[i];

      if (location[`${day}Closed`]) {
        disabledDays.push(i);
      }
    }
    return disabledDays;
  };

  return {
    slots,
    filledDays: getMissingDates({
      availableDates: slots.availableDates,
      allDates: slots.allDates,
    }),
    availableSlots: slots.availableSlotsByDay,
    disabledDays: getDisabledDaysOfWeek(location),
  };
}

export async function sendConfirmationEmail(params: {
  customerId: string;
  bookingId: string;
  locationId: string;
}) {
  // TODO: make this dynamic.
  const emailTemplate = await getTemplate("cm0yemd7h000f6kcn7uyzby9d");
  if (!emailTemplate) throw new Error("Failed to load email template");

  const { customerId, bookingId, locationId } = params;
  const customer = await getCustomerForBooking(customerId);
  if (!customer) {
    throw new Error("Customer not found");
  }

  // const location = await getLocation(locationId);
  // if (!location) {
  //   throw new Error("Location not found");
  // }

  const booking = await getBooking(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }

  // sendEmail({
  //   to: customer.email,
  //   subject: `Booking Confirmation for ${location.name}`,
  //   text: `Thank you for booking with ${
  //     location.name
  //   }. Your booking is confirmed for ${dayjs(booking.start).format(
  //     "MMMM DD, YYYY"
  //   )} at ${dayjs(booking.start).format("hh:mm A")}.`,
  //   html: emailTemplate.body,
  // });
}
