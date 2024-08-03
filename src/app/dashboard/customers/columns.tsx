"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Customer = {
  id: string;
  name: string;
  email: string;
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Customer Name",
  },
  {
    accessorKey: "email",
    header: "Customer Email",
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      return (
        <div className="flex flex-row gap-4">
          <Button
            onClick={() => {
              window.location.href = `/dashboard/customers/${row.original.id}/edit`;
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              const del = confirm(
                "Are you sure you want to remove this customer from your history?"
              );
              if (del) {
                fetch(`/api/customer/${row.original.id}`, {
                  method: "DELETE",
                }).then((res) => {
                  if (!res.ok) {
                    alert("Failed to delete customer");
                    return;
                  }
                  window.location.reload();
                });
              }
            }}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
