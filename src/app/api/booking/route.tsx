import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  const res = await prisma.booking.findMany({
    where: {
      service: {
        locations: {
          some: {
            userId: session!.user.id,
          },
        },
      },
    },
    include: {
      customer: {
        select: {
          name: true,
        },
      },
    },
  });

  return Response.json(res);
}
