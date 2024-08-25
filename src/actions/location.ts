"use server";

import { getLoggedInUser } from "@/auth/util";
import prisma from "@/lib/prisma";
import { LocationType } from "@/store/location";
import { auth } from "@clerk/nextjs/server";

export async function getLocation(id: string) {
  try {
    const res = await prisma.location.findUnique({
      where: {
        id,
        deleted: false,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
    return { ...location, ok: false };
  }
}

export async function getArtistLocations() {
  const user = await getLoggedInUser();
  if (!user) return;

  const { squareId } = user;

  try {
    const res = await prisma.location.findMany({
      where: {
        user: {
          squareId,
        },
        deleted: false,
      },
    });

    return { res, ok: true };
  } catch (error) {
    console.error(error);
    return { ...location, ok: false };
  }
}

export async function createLocation(location: LocationType) {
  const { userId } = auth();
  if (!userId) return;
  delete location.id;
  try {
    const res = await prisma.location.create({
      data: {
        ...location,
        user: {
          connect: {
            squareId: userId,
          },
        },
      },
    });

    return { ...res, ok: true };
  } catch (error) {
    console.error(error);
    return { ...location, ok: false };
  }
}

export async function updateLocation(location: any) {
  const { userId } = auth();
  if (!userId) return;

  try {
    const res = await prisma.location.update({
      where: {
        id: location.id,
        user: {
          squareId: userId,
        },
      },
      data: location,
    });

    return { ...res, ok: true };
  } catch (error) {
    console.error(error);
    return { ...location, ok: false };
  }
}

export async function deleteLocation(id: string) {
  const { userId } = auth();
  if (!userId) return;

  try {
    await prisma.location.update({
      where: {
        id,
        user: {
          squareId: userId,
        },
      },
      data: {
        deleted: true,
      },
    });

    return { id, ok: true };
  } catch (error) {
    console.error(error);
    return { id };
  }
}
