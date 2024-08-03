import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

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
    await prisma.customer.delete({
      where: { id },
    });
    return Response.json({ success: "true" });
  } catch (e) {
    return Response.json({ error: "Location not found" }, { status: 404 });
  }
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
  const data = await req.json();
  try {
    await prisma.customer.update({
      where: { id },
      data,
    });
    return Response.json({ success: "true" });
  } catch (e: any) {
    return Response.json(
      { error: `Something went wrong: ${e.message}` },
      { status: e.code }
    );
  }
}
