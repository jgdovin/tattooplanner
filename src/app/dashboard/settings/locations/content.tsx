"use client";
import { DataTable } from "@/components/custom/data-table";
import { locationColumns } from "./columns";
import { LocationDialog } from "./locationDialog";
import { useEffect, useState } from "react";

export default function Content({ data, formData }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const columns = locationColumns({ setIsOpen });
  return (
    <DataTable
      CreateButton={() => LocationDialog({ isOpen, setIsOpen, formData })}
      title="Locations"
      columns={columns}
      data={data}
    />
  );
}
