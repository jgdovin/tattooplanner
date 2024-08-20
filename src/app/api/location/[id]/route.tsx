import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!id || id === "undefined") {
    return Response.json({ error: "id is required" }, { status: 400 });
  }
  try {
    const location = await prisma.location.findUnique({
      where: { id, userId: session!.user.id },
    });
    return Response.json(location);
  } catch (e) {
    return Response.json({ error: "Location not found" }, { status: 404 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!id || id === "undefined")
    return Response.json({ error: "id is required" }, { status: 400 });
  try {
    await prisma.location.delete({
      where: { id, userId: session!.user.id },
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
  const session = await getServerSession(authOptions);

  if (!id || id === "undefined") {
    return Response.json(
      { error: true, message: "id is required" },
      { status: 400 }
    );
  }
  const data = await req.json();
  try {
    await prisma.location.update({
      where: { id, userId: session!.user.id },
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
