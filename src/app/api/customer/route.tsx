import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json("You shouldnt be here", { status: 401 });

  const customers = await prisma.customer.findMany({
    where: {
      artists: {
        some: {
          id: session?.user?.id,
        },
      },
    },
  });

  return Response.json(customers);
}

export async function POST(request: Request) {
  const body = await request.json();
  const session = await getServerSession(authOptions);
  if (!session) return Response.json("You shouldnt be here", { status: 401 });

  const res = await prisma.customer.create({
    data: {
      ...body,
      artists: { connect: { id: session.user.id } },
    },
  });

  revalidatePath("/dashboard/customers");
  return Response.json(res);
}
