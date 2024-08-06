import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div className="self-center">
      {!!session ? <div>Welcome!</div> : <div>You must login first!</div>}
    </div>
  );
}
