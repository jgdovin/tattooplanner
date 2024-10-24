"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getLoggedInUser() {
  const { userId } = auth();
  if (!userId) return;

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  return user;
}

export async function getLoggedInCustomer() {
  const { userId } = auth();
  if (!userId) return;

  const customer = await prisma.customer.findUnique({
    where: {
      clerkId: userId,
    },
  });

  return customer;
}

export async function addCustomerToArtist(artistId: string) {
  const { userId } = auth();
  if (!userId) return;

  await prisma.customer.update({
    where: {
      clerkId: userId,
    },
    data: {
      artists: {
        connect: {
          id: artistId,
        },
      },
    },
  });
}
