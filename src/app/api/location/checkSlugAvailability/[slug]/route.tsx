import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const location = await prisma.location.findUnique({
    where: {
      slug,
    },
  });

  return Response.json({ available: !location });
}
