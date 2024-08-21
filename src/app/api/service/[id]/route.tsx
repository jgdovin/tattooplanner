import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id || id === "undefined") {
    return Response.json({ error: "id is required" }, { status: 400 });
  }
  const session = await getServerSession(authOptions);
  const service = await prisma.service.findUnique({
    where: { id },
    include: { locations: true },
  });
  if (!service || service.userId !== session!.user.id) {
    return Response.json({ error: "Service not found" }, { status: 404 });
  }

  return Response.json(service);
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
    await prisma.service.delete({
      where: { id, userId: session!.user.id },
    });
    return Response.json({ success: "true" });
  } catch (e) {
    return Response.json({ error: "Service not found" }, { status: 404 });
  }
}

export async function PATCH(req: Request, { params }: { params: any }) {
  const { id } = params;
  if (!id || id === "undefined") {
    return Response.json(
      { error: true, message: "id is required" },
      { status: 400 }
    );
  }
  const data = await req.json();
  // Handle locations

  const conntectLocations = data.locations?.map((location: any) => ({
    id: location.id,
  }));

  data.locations = {
    set: conntectLocations,
  };

  try {
    const update = await prisma.service.update({
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
