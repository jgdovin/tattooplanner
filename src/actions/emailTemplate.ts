"use server";

import prisma from "@/lib/prisma";

export async function getEmailTemplates() {
  const res = await prisma.emailTemplate.findMany();
  return res;
}
