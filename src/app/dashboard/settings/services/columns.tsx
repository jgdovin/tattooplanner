"use client";

import { Button } from "@/components/ui/button";
import { deleteServiceAtom, fetchServiceAtom } from "@/store/service";

import { useAtom } from "jotai";
import { Dispatch, SetStateAction } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Service = {
  [key: string]: any;
  id: string;
  name: string;
  nickname: string;
  address1: string;
};

export const useServiceColumns = (
  setIsOpen: Dispatch<SetStateAction<boolean>>
) => {
  const [, deleteService] = useAtom(deleteServiceAtom);
  const [, setService] = useAtom(fetchServiceAtom);

  return [
    {
      accessorKey: "name",
      header: "Location Name",
    },
    {
      accessorKey: "duration",
      header: "Duration",
    },
    {
      accessorKey: "price",
      header: "Price $",
    },
    {
      id: "actions",
      header: "Actions",
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
              setService(row.original.id).then(() => {
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
                deleteService(row.original.id);
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
