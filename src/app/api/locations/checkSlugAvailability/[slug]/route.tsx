import prisma from "@/lib/prisma";

export async function GET(req: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
  const location = await prisma.location.findUnique({
    where: {
      slug,
    },
  });

  return Response.json({ available: !location });
}
