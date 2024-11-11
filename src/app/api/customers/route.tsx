import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) return;

  try {
    const res = await prisma.customer.findMany({
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
