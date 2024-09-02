import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId)
    return Response.json({ error: "User not authorized" }, { status: 401 });

  const res = await prisma.booking.findMany({
    where: {
      service: {
        locations: {
          some: {
            user: {
              squareId: userId,
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
