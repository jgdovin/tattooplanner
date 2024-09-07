"use client";

import { Button } from "@/components/ui/button";
import { deleteLocationAtom, fetchLocationAtom } from "@/store/location";
import { SetStateAction, useAtom } from "jotai";
import { Dispatch } from "react";

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
  setIsOpen: Dispatch<SetStateAction<boolean>>
) => {
  const [, deleteLocation] = useAtom(deleteLocationAtom);
  const [, setLocation] = useAtom(fetchLocationAtom);

  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "subject",
      header: "Subject",
    },
    {
      accessorKey: "global",
      header: "Global",
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
              setLocation(row.original.id).then(() => {
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
                deleteLocation(row.original.id);
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
