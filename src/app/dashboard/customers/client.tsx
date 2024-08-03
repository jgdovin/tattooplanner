"use client";

import { DataTable } from "@/components/custom/data-table";
import { columns } from "./columns";
import { CustomerDialog } from "./customerDialog";
import { useState } from "react";

export default function Client({ data }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DataTable
        title="Customers"
        CreateButton={() => {
          return CustomerDialog({ isOpen, setIsOpen });
        }}
        columns={columns}
        data={data}
      />
    </>
  );
}
