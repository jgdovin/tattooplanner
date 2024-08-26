import prisma from "@/lib/prisma";
import Client from "./client";
import { LocationType } from "@/store/location";
import { auth } from "@clerk/nextjs/server";
import { getLoggedInCustomer, getLoggedInUser } from "@/auth/util";
import { CustomerType } from "@/store/customer";

interface bookingProps {
  params: {
    locationId: string;
  };
}

export default async function Page({ params }: bookingProps) {
  const { userId } = auth();

  const user = await getLoggedInUser();
  const customer = (await getLoggedInCustomer()) as CustomerType;

  const { locationId } = params;

  const location = (await prisma.location.findUnique({
    where: {
      id: locationId,
    },
  })) as LocationType;

  if (!location) {
    return <div>Location not found</div>;
  }

  const services = await prisma.service.findMany({
    where: {
      locations: {
        some: {
          id: locationId,
        },
      },
    },
  });
  const previewOnly = user ? true : false;
  return (
    <div className="p-10 h-full">
      <Client
        services={services}
        location={location}
        preview={previewOnly}
        customer={customer}
      />
    </div>
  );
}
