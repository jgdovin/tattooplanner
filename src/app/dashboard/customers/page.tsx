import { DataTable } from "@/components/custom/data-table";
import { columns, Customer } from "./columns";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
  const data = (await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
      customerToArtists: {
        some: {
          artistId: session?.id,
        },
      },
    },
    include: {
      customerToArtists: true,
    },
  })) as Customer[];

  return (
    <main className="p-10">
      <DataTable title="Customers" columns={columns} data={data} />
    </main>
  );
}
