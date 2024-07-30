import { DataTable } from "@/components/custom/data-table";
import { columns, Customer } from "./columns";
import prisma from "@/lib/prisma";
export default async function Home() {
  const data = (await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },
  })) as Customer[];

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Customers</h1>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
