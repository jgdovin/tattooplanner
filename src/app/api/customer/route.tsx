import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const res = await prisma.customer.create({
    data: {
      ...body,
      artists: { connect: { id: session.user.id } },
    },
  });

  revalidatePath("/dashboard/customers");
  return Response.json(res);
}
