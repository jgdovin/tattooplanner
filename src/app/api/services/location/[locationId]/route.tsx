import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { locationId: string } }
) {
  const { locationId } = params;
  const location = await prisma.service.findMany({
    where: {
      locations: {
        some: {
          id: locationId,
        },
      },
      deleted: false,
    },
    omit: {
      deleted: true,
    },
  });
  return Response.json(location);
}
