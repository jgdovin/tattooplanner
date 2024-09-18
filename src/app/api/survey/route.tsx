import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return Response.json({ error: "Not signed in" }, { status: 401 });

  const res = await prisma.survey.findMany({
    where: {
      user: {
        squareId: userId,
      },
      deleted: false,
    },
  });

  if (!res)
    return Response.json({ error: "Survey not found" }, { status: 404 });

  return Response.json(res);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return Response.json({ error: "Not signed in" }, { status: 401 });

  const body = await req.json();

  const res = await prisma.survey.create({
    data: {
      ...body,
      json: body.json || {},
      user: {
        connect: {
          squareId: userId,
        },
      },
    },
  });

  return Response.json(res);
}
