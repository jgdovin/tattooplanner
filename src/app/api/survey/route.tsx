import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const res = await prisma.survey.findMany({
    where: {
      user: {
        clerkId: userId,
      },
      deleted: false,
    },
  });

  return Response.json(res);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();

  const res = await prisma.survey.create({
    data: {
      ...body,
      json: body.json || {},
      user: {
        connect: {
          clerkId: userId,
        },
      },
    },
  });

  return Response.json(res);
}
