import prisma from "@/lib/prisma";
import Client from "./client";
import { LocationType } from "@/store/location";

interface bookingProps {
  params: {
    locationId: string;
  };
}

export default async function Page({ params }: bookingProps) {
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

  return (
    <div className="p-10 h-full">
      <Client services={services} location={location} />
    </div>
  );
}
