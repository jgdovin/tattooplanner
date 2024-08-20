import { formSchema } from "@/forms/customerForm";
import { atom } from "jotai";
import { z } from "zod";

// typescript shenanigans to allow an emtpy phone number
type E164Number = string & { __tag: "E164Number" };
type PhoneNumber = E164Number | "";

export type CustomerType = Omit<z.infer<typeof formSchema>, "phone"> & {
  phone: PhoneNumber;
};

const EMPTY_CUSTOMER_DATA: CustomerType = {
  name: "",
  email: "",
  phone: "",
  notes: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  id: undefined,
};

export interface CustomerDictionary {
  [key: string]: CustomerType;
}

export const customerAtom = atom<CustomerType>(EMPTY_CUSTOMER_DATA);

export const customersAtom = atom<CustomerType[]>([]);

export const newCustomerAtom = atom<CustomerType>(EMPTY_CUSTOMER_DATA);

export const fetchCustomerAtom = atom(
  (get) => get(customerAtom),
  async (_, set, customerId: string) => {
    if (!customerId) {
      set(customerAtom, EMPTY_CUSTOMER_DATA);
      return;
    }
    const res = await fetch(`/api/customer/${customerId}`);
    const data = await res.json();
    set(customerAtom, data);
  }
);

const addCustomer = async (
  customers: CustomerType[],
  customer: CustomerType
) => {
  return [...customers, customer];
};

export const addCustomerAtom = atom(
  null,
  async (get, set, customer: CustomerType) => {
    const oldCustomers = get(customersAtom);
    set(customersAtom, await addCustomer(get(customersAtom), customer));

    const res = await fetch("/api/customer", {
      method: "POST",
      body: JSON.stringify(customer),
    });

    if (!res.ok) {
      set(customersAtom, oldCustomers);
      return;
    }
    const newCustomer = await res.json();

    set(customersAtom, (customers) =>
      customers.map((c) =>
        c.id === "" || c.id === undefined ? newCustomer : c
      )
    );
  }
);

export const updateCustomerAtom = atom(
  null,
  async (get, set, customer: CustomerType) => {
    const oldCustomers = get(customersAtom);

    set(customersAtom, (customers) =>
      customers.map((c) => (c.id === customer.id ? customer : c))
    );

    const res = await fetch(`/api/customer/${customer.id}`, {
      method: "PATCH",
      body: JSON.stringify(customer),
    });

    if (!res.ok) {
      set(customersAtom, oldCustomers);
      // TODO: add toast notification
      return;
    }
  }
);

export const deleteCustomerAtom = atom(null, async (get, set, id: string) => {
  const customers = get(customersAtom);
  let oldCustomer;
  const newCustomers = customers.filter((customer) => {
    if (customer.id === id) {
      oldCustomer = customer;
      return false;
    }
    return true;
  });

  set(customersAtom, newCustomers);
  const res = await fetch(`/api/customer/${id}`, { method: "DELETE" });

  if (res.ok) return;

  if (!res.ok && oldCustomer) {
    set(customersAtom, await addCustomer(get(customersAtom), oldCustomer));
    return;
  }
  // TODO: add toast notification
  throw new Error("Customer not deleted");
});
