import prisma from "@/lib/prisma";
import Client from "./client";
import { LocationType } from "@/features/locations/schemas/locations";
import {
  addCustomerToArtist,
  getLoggedInCustomer,
  getLoggedInUser,
} from "@/lib/auth";
import { CustomerType } from "@/lib/store/customer";
import { getLocationServices } from "@/lib/actions/book";

interface bookingProps {
  params: {
    locationId: string;
  };
}

export default async function Page({ params }: bookingProps) {
  const user = await getLoggedInUser();
  const customer = (await getLoggedInCustomer()) as CustomerType;

  const { locationId } = params;

  const location = await prisma.location.findUnique({
    where: {
      id: locationId,
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!location) {
    return <div>Location not found</div>;
  }

  if (customer) {
    addCustomerToArtist(location.user.id);
  }

  const services = await getLocationServices(locationId);

  const previewOnly = user ? true : false;
  return (
    <div className="p-10 h-full">
      <Client
        services={services}
        location={location as LocationType}
        preview={previewOnly}
        customer={customer}
      />
    </div>
  );
}
