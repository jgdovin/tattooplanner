import { headers } from "next/headers";
import Client from "./client";
import { ServiceType } from "@/store/service";
export default async function Home({ params }: any) {
  const { id } = params;
  if (!id) throw new Error("id is required");

  const cookieStore = headers().get("cookie");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/service/${id}`,
    {
      headers: {
        cookie: cookieStore!,
      },
    }
  );

  const defaultValues: ServiceType = await res.json();

  return (
    <div className="flex flex-col w-1/4">
      <Client defaultValues={defaultValues} />
    </div>
  );
}
