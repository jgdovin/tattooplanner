import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const res = await prisma.booking.findMany({
    where: {
      service: {
        locations: {
          some: {
            user: {
              clerkId: userId,
            },
          },
        },
      },
    },
    include: {
      service: {
        select: {
          name: true,
        },
      },
      customer: {
        select: {
          name: true,
        },
      },
    },
  });

  return Response.json(res);
}
