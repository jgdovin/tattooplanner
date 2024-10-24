import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) return new Response("Unauthorized", { status: 401 });

  const services = await prisma.service.findMany({
    where: {
      deleted: false,
      userId: user.id,
    },
  });

  return Response.json(services);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  delete body.id;
  const locations = body.locations?.map((location: any) => ({
    id: location.id,
  }));
  delete body.locations;

  const res = await prisma.service.create({
    data: {
      ...body,
      user: {
        connect: {
          clerkId: userId,
        },
      },
      locations: {
        connect: locations,
      },
    },
  });

  return Response.json(res);
}
