"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getLoggedInUser() {
  const { userId } = auth();
  if (!userId) return;

  const user = await prisma.user.findUnique({
    where: {
      squareId: userId,
    },
  });

  return user;
}
