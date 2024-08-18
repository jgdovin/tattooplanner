import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Client from "./client";
export default async function Home({ params }: any) {
  const session = await getServerSession(authOptions);

  const { id } = params;
  if (!id) throw new Error("id is required");

  return (
    <div className="flex flex-col w-1/4">
      <Client id={id} />
    </div>
  );
}
