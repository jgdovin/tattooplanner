import { auth } from "@clerk/nextjs/server";
import { getServerSession } from "next-auth";

export default async function Page() {
  const { userId } = await auth();
  return (
    <div className="self-center">
      {!!userId ? <div>Welcome!</div> : <div>You must login first!</div>}
    </div>
  );
}
