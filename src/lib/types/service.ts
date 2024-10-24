import { locationSchema as locationSchema } from "@/features/locations/schemas/locations";
import { z } from "zod";

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string(),
  price: z.number().default(0),
  duration: z.string(),
  cancellationFee: z.number().default(0),
  hidePriceFromCustomers: z.boolean().default(false),
  bookableByCustomers: z.boolean().default(true),
  locations: z.array(z.array(locationSchema)).default([]),
});

export type ServiceType = z.infer<typeof formSchema>;

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
