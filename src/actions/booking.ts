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
