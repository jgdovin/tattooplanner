import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = auth();

  if (!userId) return;

  try {
    const res = await prisma.location.findMany({
      where: {
        user: {
          squareId: userId,
        },
        deleted: false,
      },
    });

    return Response.json(res);
  } catch (error) {
    console.error(error);
    return { error, ok: false };
  }
}

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) return;

  const data = await req.json();
  delete data.id;
  try {
    const res = await prisma.location.create({
      data: {
        ...data,
        user: {
          connect: {
            squareId: userId,
          },
        },
      },
    });

    return Response.json(res);
  } catch (error) {
    console.error(error);
    return { error, ok: false };
  }
}