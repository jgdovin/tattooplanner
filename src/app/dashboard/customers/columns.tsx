"use client";

import { Button } from "@/components/ui/button";
import { deleteCustomerAtom, fetchCustomerAtom } from "@/lib/store/customer";
import { SetStateAction, useAtom } from "jotai";
import { Dispatch } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Customer = {
  id: string;
  name: string;
  email: string;
};

export const useCustomerColumns = (
  setIsOpen: Dispatch<SetStateAction<boolean>>
) => {
  const [, setCustomer] = useAtom(fetchCustomerAtom);
  const [, deleteCustomer] = useAtom(deleteCustomerAtom);

  return [
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
                setCustomer(row.original.id).then(() => {
                  setIsOpen(true);
                });
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
                  deleteCustomer(row.original.id);
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
};
