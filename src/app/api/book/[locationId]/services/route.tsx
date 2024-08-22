import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { locationId: string } }
) {
  const { locationId } = params;
  const services = await prisma.service.findMany({
    where: {
      locations: {
        some: {
          id: locationId,
        },
      },
    },
  });

  return Response.json(services);
}
