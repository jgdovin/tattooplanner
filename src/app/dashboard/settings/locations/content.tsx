"use client";
import { DataTable } from "@/components/custom/data-table";
import { locationColumns } from "./columns";
import { LocationDialog } from "./locationDialog";
import { useState } from "react";

export default function Content({ data }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const columns = locationColumns({ setIsOpen });
  return (
    <DataTable
      CreateButton={() => LocationDialog({ isOpen, setIsOpen })}
      title="Locations"
      columns={columns}
      data={data}
    />
  );
}
