"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
  id: string;
  title: string;
  customer: string;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "title",
    header: "Status",
  },
  {
    accessorKey: "customer",
    header: "Customer Name",
  },
];
