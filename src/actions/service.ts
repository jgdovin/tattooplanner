"use server";
import prisma from "@/lib/prisma";
import { LocationType } from "@/types/location";
import { ServiceType } from "@/types/service";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

export async function getService(id: string) {
  try {
    const res = await prisma.service.findUnique({
      where: {
        id,
      },
      include: {
        locations: true,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
    return { error, ok: false };
  }
}

export async function getArtistServices() {
  const { userId } = auth();
  if (!userId) return;

  try {
    const res = await prisma.service.findMany({
      where: {
        user: {
          squareId: userId,
        },
        deleted: false,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
    return { error, ok: false };
  }
}

export async function getLocationsServices(locationId: string) {
  try {
    const res = await prisma.service.findMany({
      where: {
        locations: {
          some: {
            id: locationId,
          },
        },
        deleted: false,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
    return { error, ok: false };
  }
}

export async function createService(service: ServiceType) {
  const { userId } = auth();
  if (!userId) return;
  const connectLocations = service.locations?.map((location: any) => ({
    id: location.id,
  }));

  delete service.id;

  try {
    const res = await prisma.service.create({
      data: {
        ...service,
        locations: {
          connect: connectLocations,
        },
        user: {
          connect: { squareId: userId },
        },
      },
    });

    return res;
  } catch (error) {
    console.error(error);
    return { error, ok: false };
  }
}

export async function updateService(service: ServiceType) {
  const { userId } = auth();
  if (!userId) return;

  const connectLocations = service.locations?.map((location: LocationType) => ({
    id: location.id,
  }));

  const updatedData: Prisma.ServiceUpdateInput = {
    ...service,
    locations: {
      set: connectLocations,
    },
  };

  try {
    const res = await prisma.service.update({
      where: {
        id: service.id,
        user: {
          squareId: userId,
        },
      },
      data: updatedData,
    });

    return res;
  } catch (error) {
    console.error(error);
    return { error, ok: false };
  }
}

export async function deleteService(id: string) {
  const { userId } = auth();
  if (!userId) return;

  try {
    await prisma.service.update({
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

    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}
