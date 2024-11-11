"use client";

import { Button } from "@/components/ui/button";

import LocationCopyButton from "@/features/locations/components/LocationCopyButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// TODO: update file to be for projects.

export const getProjectColumns = (
  router: AppRouterInstance,
  deleteLocation: UseMutationResult<AxiosResponse<any, any>, Error, string>
) => {
  return [
    {
      accessorKey: "name",
      header: "Project Name",
    },
    {
      id: "actions",
      cell: ({ row }: any) => (
        <div className="flex flex-row gap-4">
          <LocationCopyButton locationId={row.original.slug} />
          <Button
            onClick={() => {
              router.push(`/dashboard/locations/edit/${row.original.id}`);
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
