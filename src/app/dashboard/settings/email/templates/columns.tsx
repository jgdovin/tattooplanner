"use client";

import { Button } from "@/components/ui/button";
import {
  deleteTemplateAtom,
  fetchTemplateAtom,
} from "@/lib/store/emailTemplate";

import { SetStateAction, useAtom } from "jotai";
import { Dispatch } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Template = {
  [key: string]: any;
  id: string;
  name: string;
  nickname: string;
  address1: string;
};

export const useTemplateColumns = (
  setIsOpen: Dispatch<SetStateAction<boolean>>
) => {
  const [, deleteTemplate] = useAtom(deleteTemplateAtom);

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
              window.location.href = `/dashboard/settings/email/templates/edit/${row.original.id}`;
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
                deleteTemplate(row.original.id);
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
