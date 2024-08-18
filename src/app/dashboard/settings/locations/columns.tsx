"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Location = {
  [key: string]: any;
  id: string;
  name: string;
  nickname: string;
  address1: string;
};

export const locationColumns = () => {
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
          <Button
            onClick={() => {
              window.location.href = `/book/${row.original.id}`;
            }}
          >
            Book
          </Button>
          <Button
            onClick={() => {
              window.location.href = `/dashboard/settings/locations/${row.original.id}/edit`;
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              const del = confirm(
                "Are you sure you want to delete this location?"
              );
              if (del) {
                fetch(`/api/location/${row.original.id}`, {
                  method: "DELETE",
                }).then(() => {
                  window.location.reload();
                });
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
