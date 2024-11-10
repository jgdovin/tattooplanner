import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextApiResponse } from "next";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const res = await prisma.location.findUnique({
      where: {
        id,
        deleted: false,
      },
    });

    return Response.json(res);
  } catch (error) {
    console.error(error);
  }
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { id } = params;

  const data = await req.json();

  try {
    const res = await prisma.location.update({
      where: {
        id,
        user: {
          clerkId: userId,
        },
      },
      data,
    });

    return Response.json(res);
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { id } = params;

  try {
    const res = await prisma.location.update({
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
  } catch (error) {
    console.error(error);
  }
}
