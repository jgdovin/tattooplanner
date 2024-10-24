import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const res = await prisma.service.delete({
    where: {
      id,
      user: {
        clerkId: userId,
      },
    },
  });
  return Response.json(res);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const service = await prisma.service.findUnique({
    where: {
      id,
      user: {
        clerkId: userId,
      },
      deleted: false,
    },
    omit: {
      deleted: true,
    },
  });

  if (!service) return new Response("Not found", { status: 404 });

  return Response.json(service);
}
