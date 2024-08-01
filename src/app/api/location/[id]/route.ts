import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  if (!id || id === "undefined")
    return Response.json({ error: "id is required" }, { status: 400 });
  try {
    await prisma.location.delete({
      where: { id, userId: session.user.id },
    });
    return Response.json({ success: "true" });
  } catch (e) {
    return Response.json({ error: "Location not found" }, { status: 404 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) return Response.json({ error: "id is required" }, { status: 400 });
  return Response.json({ success: "true" });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id || id === "undefined") {
    return Response.json(
      { error: true, message: "id is required" },
      { status: 400 }
    );
  }
  console.log(req.json());
  // const updateLocation = await prisma.location.update({
  //   where: { id },
  //   data: await req.json(),
  // });
  return Response.json({ success: "true" });
}
