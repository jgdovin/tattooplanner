import { EMPTY_STRING } from "@/lib/consts";
import { z } from "zod";

export const locationSchema = z.object({
  name: z.string().min(3),
});

export const projectInputSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  notes: z.string().optional(),
});

export type ProjectType = z.infer<typeof projectInputSchema>;

export const EMPTY_PROJECT_DATA: ProjectType = {
  id: EMPTY_STRING,
  name: EMPTY_STRING,
};
