"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getArtistBookings() {
  const { userId } = auth();
  if (!userId) return;

  const res = await prisma.booking.findMany({
    where: {
      location: {
        user: {
          squareId: userId,
        },
      },
    },
    include: {
      customer: true,
      service: true,
    },
  });

  return res;
}

export async function getArtistRecentBookings(num: number = 5) {
  const { userId } = auth();
  if (!userId) return;

  const res = await prisma.booking.findMany({
    where: {
      location: {
        user: {
          squareId: userId,
        },
      },
    },
    select: {
      id: true,
      start: true,
      service: {
        select: {
          name: true,
        },
      },
      customer: {
        select: {
          name: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
    take: num,
  });

  return res;
}

export async function getBooking(id: string) {
  const res = await prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
      service: true,
    },
  });

  return res;
}