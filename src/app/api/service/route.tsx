import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    return Response.json("You shouldnt be here", { status: 401 });
  }

  const body = await request.json();
  const locations = body.locations;
  delete body.locations;

  const res = await prisma.service.create({
    data: {
      ...body,
      user: { connect: { id: session.user.id } },
    },
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
