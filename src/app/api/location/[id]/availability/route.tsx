import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { daysInMonth } from "@/lib/utils";
import { getServerSession } from "next-auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { year, month, service } = await req.json();

  const daysThisMonth = daysInMonth({ year, month });

  for (let i = 1; i <= daysThisMonth; i++) {
    const date = new Date(`${year}-${month}-${i}`);
    console.log(date);
  }

  const session = await getServerSession(authOptions);
  // if (!session) {
  //   return Response.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const location = await prisma.location.findUnique({
    where: {
      id: id,
    },
  });

  return Response.json(location);
}
