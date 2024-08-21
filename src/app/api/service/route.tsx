import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json("You shouldnt be here", { status: 401 });
  }

  const data = await request.json();
  delete data.id; // remove id as this is auto-generated

  const conntectLocations = data.locations?.map((location: any) => ({
    id: location.id,
  }));

  data.locations = {
    connect: conntectLocations,
  };

  data.user = {
    connect: { id: session.user.id },
  };

  const res = await prisma.service.create({
    data,
  });

  revalidatePath("/dashboard/settings/services");
  return Response.json(res);
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json("You shouldnt be here", { status: 401 });
  }

  const services = await prisma.service.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return Response.json(services);
}
