import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Client from "./client";
export default async function Home({ searchParams }: any) {
  const session = await getServerSession(authOptions);

  // if (!searchParams.edit) {
  //   return (
  //     <main className="p-10">
  //       <Client data={data} />
  //     </main>
  //   );
  // }

  // const formData = (await prisma.location.findUnique({
  //   where: {
  //     id: searchParams.edit || "",
  //   },
  // })) as Location;
  // if (!formData) throw new Error("Location not found");

  return (
    <main className="p-10">
      <Client />
    </main>
  );
}
