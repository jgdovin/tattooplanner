import { DataTable } from "@/components/custom/data-table";
import { columns, Project } from "./columns";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">Projects</h1>
        <DataTable columns={columns} data={[]} />
      </main>
    );
  }
  const projects = await prisma.project.findMany({
    include: {
      customer: true,
    },
  });
  const data = projects.map((project) => ({
    id: project.id,
    title: project.name,
    customer: project.customer.name,
  })) as Project[];
  return (
    <main className="p-10">
      <DataTable title="Projects" columns={columns} data={data} />
    </main>
  );
}
