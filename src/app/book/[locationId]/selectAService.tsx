"use client";

import { Service } from "@/app/dashboard/settings/services/columns";
import { LocationType } from "@/store/location";

import ShopInfo from "./components/ShopInfo";
import ServiceSelector from "./components/ServiceSelector";

export default function SelectAService({
  services,
  location,
}: {
  services: Service[];
  location: LocationType;
}) {
  return (
    <div className="max-w-7xl">
      <ServiceSelector services={services} />
      <ShopInfo location={location} />
    </div>
  );
}
