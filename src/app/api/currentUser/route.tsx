import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const clerkUser = await auth();
  const { userId } = clerkUser;
  if (!userId) {
    return Response.json({ error: "User is not authorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      clerkId: true,
    },
    where: {
      clerkId: userId,
    },
  });

  if (user) return Response.json({ user });
  const customer = await prisma.customer.findUnique({
    select: {
      id: true,
      name: true,
      clerkId: true,
    },
    where: {
      clerkId: userId,
    },
  });

  if (customer) return Response.json({ customer });
  return Response.json(
    { error: "User not found... something went really wrong" },
    { status: 406 }
  );
}
