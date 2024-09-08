"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createTemplate(data: any) {
  const { userId } = auth();
  if (!userId) return;

  const res = await prisma.emailTemplate.create({
    ...data,
    user: {
      connect: {
        squareId: userId,
      },
    },
  });

  return res;
}

export async function getTemplate(id: string) {
  const { userId } = auth();
  if (!userId) return;

  try {
    const res = await prisma.emailTemplate.findUnique({
      where: {
        id,
        OR: [
          {
            user: {
              squareId: userId,
            },
          },
          {
            global: true,
          },
        ],
      },
    });

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getTemplates() {
  const { userId } = auth();
  if (!userId) return;

  try {
    const res = await prisma.emailTemplate.findMany({
      where: {
        OR: [
          {
            user: {
              squareId: userId,
            },
          },
          {
            global: true,
          },
        ],
      },
    });

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTemplate(id: string) {
  const { userId } = auth();
  if (!userId) return;

  try {
    await prisma.emailTemplate.delete({
      where: {
        id,
        user: {
          squareId: userId,
        },
      },
    });
    return { id, ok: true };
  } catch (error) {
    console.error(error);
  }
}

export async function updateTemplate(data: any) {
  const { userId } = auth();
  if (!userId) return;

  try {
    const res = await prisma.emailTemplate.update({
      where: {
        id: data.id,
        user: {
          squareId: userId,
        },
      },
      data,
    });

    return res;
  } catch (error) {
    console.error(error);
  }
}
