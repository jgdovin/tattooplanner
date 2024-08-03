import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Client from "./client";
import prisma from "@/lib/prisma";
import { Location } from "../../columns";
export default async function Home({ params }: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  const { id } = params;
  if (!id) throw new Error("id is required");

  const formData = (await prisma.location.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
  })) as Location;

  return (
    <div className="flex flex-col w-1/4">
      <Client defaultValues={formData} />
    </div>
  );
}
