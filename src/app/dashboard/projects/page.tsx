import { DataTable } from "@/components/custom/data-table";
import { columns, Project } from "./columns";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
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
