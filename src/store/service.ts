import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { atom } from "jotai";
import { getServerSession } from "next-auth";

const EMPTY_SERVICE_DATA = {
  id: "",
  name: "",
  description: "",
  price: 0,
  cancellationFee: 0,
  duration: "00:30",
  hidePriceFromCustomers: false,
  bookableByCustomers: true,
  locations: [],
};

export interface ServiceType {
  id?: string;
  name: string;
  description: string;
  price: number;
  cancellationFee: number;
  duration: string;
  hidePriceFromCustomers: boolean;
  bookableByCustomers: boolean;
  locations: string[];
}

interface ServiceDictionary {
  [key: string]: ServiceType;
}

export const servicesAtom = atom<ServiceType[]>([]);

export const newServiceAtom = atom<ServiceType>(EMPTY_SERVICE_DATA);

const addService = async (services: ServiceType[], service: ServiceType) => {
  return [...services, service];
};

export const fetchServices = async () => {
  const services = await fetch("/api/service").then((res) => res.json());
  return services;
};

export const addServiceAtom = atom(
  null,
  async (get, set, service: ServiceType) => {
    const oldService = get(servicesAtom);
    set(servicesAtom, await addService(get(servicesAtom), service));

    const res = await fetch("/api/service", {
      method: "POST",
      body: JSON.stringify(service),
    });

    if (!res.ok) {
      set(servicesAtom, oldService);
    }
  }
);

export const deleteServiceAtom = atom(null, async (get, set, id: string) => {
  const services = get(servicesAtom);
  let oldService;
  const newServices = services.filter((service) => {
    if (service.id === id) {
      oldService = service;
      return false;
    }
    return true;
  });

  set(servicesAtom, newServices);
  const res = await fetch(`/api/service/${id}`, { method: "DELETE" });

  if (res.ok) return;

  if (!res.ok && oldService) {
    set(servicesAtom, await addService(get(servicesAtom), oldService));
    return;
  }
  // TODO: add toast notification
  throw new Error("Service not deleted");
});
