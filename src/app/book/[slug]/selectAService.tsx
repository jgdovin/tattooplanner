"use client";

import { LocationType } from "@/features/locations/schemas/locations";

import ShopInfo from "./components/ShopInfo";
import ServiceSelector from "./components/ServiceSelector";
import { ServiceType } from "@/features/services/schemas/services";

export default function SelectAService({
  services,
  location,
}: {
  services: ServiceType[];
  location: LocationType;
}) {
  return (
    <div className="max-w-7xl">
      <ServiceSelector services={services} />
      <ShopInfo location={location} />
    </div>
  );
}
