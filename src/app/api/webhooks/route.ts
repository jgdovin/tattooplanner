import { Webhook } from "svix";
import { headers } from "next/headers";
import { createClerkClient, WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  // console.log("Webhook body:", body);

  if (eventType === "user.created") {
    // TODO: Update to handle customer/artist user creation.

    const {
      data: {
        id: squareId,
        email_addresses: {
          [0]: { email_address },
        },
        first_name,
        last_name,
      },
    } = evt;

    const clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    if (evt.data.unsafe_metadata?.role === "user") {
      await prisma.user.upsert({
        where: {
          squareId,
        },
        update: {
          email: email_address,
          name: `${first_name} ${last_name}`,
          squareId,
        },
        create: {
          email: email_address,
          name: `${first_name} ${last_name}`,
          squareId,
        },
      });
      clerkClient.users.updateUser(squareId, {
        publicMetadata: {
          role: "user",
        },
      });
    } else {
      const artistId = evt.data.unsafe_metadata?.artistId as string;

      const artistConnect = artistId
        ? { connect: { id: artistId } }
        : undefined;

      await prisma.customer.upsert({
        where: {
          squareId,
        },
        update: {
          email: email_address,
          name: `${first_name} ${last_name}`,
          squareId,
          artists: artistConnect,
        },
        create: {
          email: email_address,
          name: `${first_name} ${last_name}`,
          squareId,
          phone: "",
          artists: artistConnect,
        },
      });
      clerkClient.users.updateUser(squareId, {
        publicMetadata: {
          role: "customer",
        },
      });
    }
  }

  return new Response("", { status: 200 });
}
