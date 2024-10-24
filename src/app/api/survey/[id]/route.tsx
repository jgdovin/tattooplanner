import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { id } = params;

  const res = await prisma.survey.findUnique({
    where: {
      id,
      user: {
        clerkId: userId,
      },
      deleted: false,
    },
  });

  if (!res) return new Response("Survey Not found", { status: 404 });

  return Response.json(res);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { id } = params;

  const body = await req.json();
  const name = body.json.title;

  const res = await prisma.survey.update({
    where: {
      id,
      user: {
        clerkId: userId,
      },
      deleted: false,
    },
    data: {
      json: body.json,
      name,
    },
  });

  return Response.json(res);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { id } = params;

  const res = await prisma.survey.update({
    where: {
      id,
      user: {
        clerkId: userId,
      },
    },
    data: {
      deleted: true,
    },
  });

  return Response.json(res);
}
