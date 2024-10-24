"use client";

import { Button } from "@/components/ui/button";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getServiceColumns = (
  router: AppRouterInstance,
  deleteService: UseMutationResult<AxiosResponse<any, any>, Error, string>
) => {
  return [
    {
      accessorKey: "name",
      header: "Service Name",
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
                "Are you sure you want to delete this services?"
              );
              if (del) {
                console.log("delete service");
                deleteService.mutate(row.original.id);
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
