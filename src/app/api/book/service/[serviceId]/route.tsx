import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  const { serviceId } = params;
  const services = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  return Response.json(services);
}
