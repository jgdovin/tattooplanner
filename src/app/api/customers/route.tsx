import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) return;

  const params = req.nextUrl.searchParams;
  const forProjectList = params.get("projectList");

  try {
    const res = await prisma.customer.findMany({
      select: forProjectList
        ? {
            name: true,
            id: true,
          }
        : undefined,
      where: {
        artists: {
          some: {
            clerkId: userId,
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

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) return;

  const data = await req.json();
  delete data.id;

  try {
    const res = await prisma.customer.create({
      data: {
        ...data,
        artists: {
          connect: {
            clerkId: userId,
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
