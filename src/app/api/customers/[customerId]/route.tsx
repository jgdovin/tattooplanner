import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  props: { params: Promise<{ customerId: string }> }
) {
  const { userId } = await auth();
  if (!userId) return;
  const { customerId } = await props.params;
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
      artists: {
        some: {
          clerkId: userId,
        },
      },
    },
  });
  if (!customer) {
    return Response.json({ error: "Customer not found" }, { status: 404 });
  }

  return Response.json(customer);
}
