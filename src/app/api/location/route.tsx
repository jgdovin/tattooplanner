import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You shouldnt be here");
  }

  const body = await request.json();
  delete body.id;
  const res = await prisma.location.create({
    data: {
      ...body,
      user: { connect: { id: userId } },
    },
  });

  revalidatePath("/dashboard/settings/locations");
  return Response.json(res);
}

export async function GET(request: Request) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You shouldnt be here");
  }

  const res = await prisma.location.findMany({
    where: { userId },
  });

  return Response.json(res);
}
