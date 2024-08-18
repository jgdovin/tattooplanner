import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!id || id === "undefined")
    return Response.json({ error: "id is required" }, { status: 400 });
  try {
    await prisma.service.delete({
      where: { id, userId: session!.user.id },
    });
    return Response.json({ success: "true" });
  } catch (e) {
    return Response.json({ error: "Service not found" }, { status: 404 });
  }
}

export async function PATCH(req: Request, { params }: { params: any }) {
  console.log("testing");
  const { id } = params;
  if (!id || id === "undefined") {
    return Response.json(
      { error: true, message: "id is required" },
      { status: 400 }
    );
  }
  const data = await req.json();
  // Handle locations
  delete data.locations;
  try {
    const update = await prisma.service.update({
      where: { id },
      data,
    });
    console.log(update);
    return Response.json({ success: "true" });
  } catch (e: any) {
    return Response.json(
      { error: `Something went wrong: ${e.message}` },
      { status: e.code }
    );
  }
}
