"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createTemplate(data: any) {
  const { userId } = auth();
  if (!userId) return;
  delete data.id;
  const res = await prisma.emailTemplate.create({
    data: {
      ...data,
      user: {
        connect: {
          clerkId: userId,
        },
      },
    },
  });
  console.log(res);
  return res;
}

export async function getTemplate(id: string) {
  const { userId } = auth();
  if (!userId) return;

  try {
    const res = await prisma.emailTemplate.findUnique({
      where: {
        id,
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
              clerkId: userId,
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
          clerkId: userId,
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
          clerkId: userId,
        },
      },
      data,
    });

    return res;
  } catch (error) {
    console.error(error);
  }
}
