import { EMPTY_STRING } from "@/lib/consts";
import * as z from "zod";

export const customerFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email(),
  phone: z.string(),
  notes: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  id: z.string().optional(),
});

export type CustomerType = z.infer<typeof customerFormSchema>;

export const EMPTY_CUSTOMER_DATA: CustomerType = {
  name: EMPTY_STRING,
  email: EMPTY_STRING,
  phone: EMPTY_STRING,
  notes: EMPTY_STRING,
  address1: EMPTY_STRING,
  address2: EMPTY_STRING,
  city: EMPTY_STRING,
  state: EMPTY_STRING,
  zip: EMPTY_STRING,
  id: undefined,
};
