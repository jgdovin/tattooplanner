"use client";

import { Button } from "@/components/ui/button";

import LocationCopyButton from "@/features/locations/components/LocationCopyButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

// TODO: update file to be for projects.

export const getProjectColumns = () => {
  const router = useRouter();

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
        </div>
      ),
    },
  ];
};
