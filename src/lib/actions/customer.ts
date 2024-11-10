"use server";

import prisma from "@/lib/prisma";
import { CustomerType } from "@/lib/store/customer";
import { auth, createClerkClient } from "@clerk/nextjs/server";

export async function getCustomers() {
  const { userId } = await auth();
  if (!userId) return;

  const customers = await prisma.customer.findMany({
    where: {
      artists: {
        some: {
          clerkId: userId,
        },
      },
    },
  });
  return customers;
}

export async function getCustomer(id: string) {
  const { userId } = await auth();
  if (!userId) return;

  const customer = await prisma.customer.findFirst({
    where: {
      id,
      artists: {
        some: {
          clerkId: userId,
        },
      },
    },
  });

  return customer;
}

export async function createCustomer(body: CustomerType) {
  const { userId } = await auth();
  if (!userId) return;

  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  });

  const [firstName, lastName = ""] = body.name.split(" ");

  try {
    const user = await clerkClient.users.createUser({
      firstName,
      lastName,
      emailAddress: [body.email],
      // @ts-ignore: phoneNumbers is correct, not sure whats wrong with type here
      phoneNumbers: [body.phone],
      publicMetadata: {
        role: "customer",
      },
    });

    const res = await prisma.customer.create({
      data: {
        ...body,
        clerkId: user.id,
        artists: {
          connect: {
            clerkId: userId,
          },
        },
      },
    });

    return res;
  } catch (error: any) {
    console.error(error.errors[0]);
  }
}

export async function updateCustomer(customer: any) {
  const { userId } = await auth();
  if (!userId) return;

  const res = await prisma.customer.update({
    where: {
      id: customer.id,
      artists: {
        some: {
          clerkId: userId,
        },
      },
    },
    data: customer,
  });

  return res;
}

export async function deleteCustomer(id: string) {
  const { userId } = await auth();
  if (!userId) return;

  const res = await prisma.customer.update({
    where: {
      id,
      artists: {
        some: {
          clerkId: userId,
        },
      },
    },
    data: {
      artists: {
        disconnect: {
          clerkId: userId,
        },
      },
    },
  });

  return res;
}
