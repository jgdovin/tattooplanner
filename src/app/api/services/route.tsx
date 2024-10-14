import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  return Response.json(body);
  const connectLocations = body.locations?.map((location: any) => ({
    id: location.id,
  }));

  const res = await prisma.service.create({
    data: {
      ...body,
    },
  });

  return Response.json(res);
}
