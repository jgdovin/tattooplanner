import { atom } from "jotai";

export const EMPTY_SERVICE_DATA = {
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

export const serviceAtom = atom<ServiceType>(EMPTY_SERVICE_DATA);

export const servicesAtom = atom<ServiceType[]>([]);

export const newServiceAtom = atom<ServiceType>(EMPTY_SERVICE_DATA);

export const fetchServiceAtom = atom(
  (get) => get(serviceAtom),
  async (_, set, serviceId: string) => {
    if (!serviceId) {
      set(serviceAtom, EMPTY_SERVICE_DATA);
      return;
    }
    const res = await fetch(`/api/service/${serviceId}`);
    const data = await res.json();
    set(serviceAtom, data);
  }
);

const addService = async (services: ServiceType[], service: ServiceType) => {
  return [...services, service];
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
      return;
    }
    const newService = await res.json();

    set(servicesAtom, (services) =>
      services.map((s) => (s.id === "" ? newService : s))
    );
  }
);

export const updateServiceAtom = atom(
  null,
  async (get, set, service: ServiceType) => {
    const oldService = get(servicesAtom);

    set(servicesAtom, (services) =>
      services.map((s) => (s.id === service.id ? service : s))
    );

    const res = await fetch(`/api/service/${service.id}`, {
      method: "PATCH",
      body: JSON.stringify(service),
    });

    if (!res.ok) {
      set(servicesAtom, oldService);
      // TODO: add toast notification
      return;
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
