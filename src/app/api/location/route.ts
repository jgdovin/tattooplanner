import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const res = await prisma.location.create({
    data: {
      ...body,
      user: { connect: { id: session.user.id } },
    },
  });

  revalidatePath("/dashboard/settings/locations");
  return Response.json(res);
}
