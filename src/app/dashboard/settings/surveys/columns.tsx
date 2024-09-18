"use client";

import { Button } from "@/components/ui/button";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Template = {
  [key: string]: any;
  id: string;
  name: string;
  nickname: string;
  address1: string;
};

export const useSurveyColumns = ({
  deleteSurvey,
}: {
  deleteSurvey: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    string,
    unknown
  >;
}) => {
  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "actions",
      cell: ({ row }: any) => (
        <div className="flex flex-row gap-4">
          <Button
            onClick={() => {
              window.location.href = `/survey/editor/${row.original.id}`;
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              window.location.href = `/dashboard/settings/surveys/${row.original.id}`;
            }}
          >
            Preview
          </Button>
          <Button
            onClick={() => {
              const del = confirm(
                "Are you sure you want to delete this service?"
              );
              if (del) {
                deleteSurvey(row.original.id);
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
