"use client";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export const getCustomerColumns = () => {
  const router = useRouter();

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
              router.push(`/dashboard/customers/${row.original.id}`);
            }}
          >
            View
          </Button>
        </div>
      ),
    },
  ];
};
