"use client";

import { Button } from "@/components/ui/button";
import { deleteLocationAtom, fetchLocationAtom } from "@/store/location";
import { SetStateAction, useAtom } from "jotai";
import { Dispatch } from "react";
import LocationCopyButton from "./locationCopyButton";

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
