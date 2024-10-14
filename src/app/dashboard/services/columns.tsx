"use client";

import { Button } from "@/components/ui/button";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Location = {
  [key: string]: any;
  id: string;
  name: string;
  nickname: string;
  address1: string;
};

export const useServiceColumns = () => {
  return [
    {
      accessorKey: "name",
      header: "Service Name",
    },
    {
      accessorKey: "nickname",
      header: "Location Nickname",
    },
    {
      accessorKey: "address1",
      header: "Location Address",
    },
    {
      id: "actions",
      cell: ({ row }: any) => (
        <div className="flex flex-row gap-4">
          <Button
            onClick={() => {
              router.push(`/dashboard/services/edit/${row.original.id}`);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              const del = confirm(
                "Are you sure you want to delete this service?"
              );
              if (del) {
                deleteLocation.mutate(row.original.id);
              }
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
};
