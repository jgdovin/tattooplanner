import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Client from "./client";

export default async function Page({ params }: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  const { id } = params;
  if (!id) throw new Error("id is required");

  const formData = await prisma.customer.findUnique({
    where: {
      id,
      artists: {
        some: {
          id: session.user.id,
        },
      },
    },
  });
  if (!formData) throw new Error("Customer not found");

  return (
    <div className="flex flex-col w-1/4">
      <Client defaultValues={formData} />
    </div>
  );
}
