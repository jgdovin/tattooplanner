import { DataTable } from "@/components/custom/data-table";
import { columns, Project } from "./columns";
import prisma from "@/lib/prisma";

export default async function Home() {
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
      <h1 className="text-2xl font-bold">Projects</h1>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
