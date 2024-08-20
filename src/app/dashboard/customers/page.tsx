import { DataTable } from "@/components/custom/data-table";
import { useCustomerColumns } from "./columns";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Client from "./client";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const data = await prisma.customer.findMany({
    where: {
      artists: {
        some: {
          id: session?.user?.id,
        },
      },
    },
  });

  return (
    <main className="p-10">
      <Client data={data} />
    </main>
  );
}
