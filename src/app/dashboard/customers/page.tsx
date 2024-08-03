import { DataTable } from "@/components/custom/data-table";
import { columns } from "./columns";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Client from "./client";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">Customers</h1>
        <DataTable columns={columns} data={[]} />
      </main>
    );
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
