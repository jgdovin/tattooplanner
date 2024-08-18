"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function createService(data: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json("You shouldnt be here", { status: 401 });
  }

  const body = data;
  const locations = body.locations;
  delete body.locations;

  const res = await prisma.service.create({
    data: {
      ...body,
      user: { connect: { id: session.user.id } },
    },
  });
  return res;
}
