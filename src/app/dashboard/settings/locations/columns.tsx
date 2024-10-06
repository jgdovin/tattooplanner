"use client";

import { Button } from "@/components/ui/button";

import LocationCopyButton from "./locationCopyButton";
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

export const useLocationColumns = (
  router: AppRouterInstance,
  deleteLocation: UseMutationResult<AxiosResponse<any, any>, Error, string>
) => {
  return [
    {
      accessorKey: "name",
      header: "Location Name",
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
          <LocationCopyButton locationId={row.original.id} />
          <Button
            onClick={() => {
              router.push(
                `/dashboard/settings/locations/edit/${row.original.id}`
              );
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
