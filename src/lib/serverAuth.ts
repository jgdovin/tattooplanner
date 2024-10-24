import prisma from "@/lib/prisma";

export const userIsUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  return !!user;
};
