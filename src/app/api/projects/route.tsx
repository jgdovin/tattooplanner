import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) return;

  try {
    const res = await prisma.project.findMany({
      where: {
        customer: {
          artists: {
            some: {
              clerkId: userId,
            },
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
