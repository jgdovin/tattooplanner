"use client";

import { DataTable } from "@/components/custom/data-table";
import { columns } from "./columns";
import { CustomerDialog } from "./customerDialog";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { customersAtom } from "@/store/customer";

export default function Client({ data }: any) {
  const [customers, setCustomers] = useAtom(customersAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customer")
      .then(async (data) => {
        const customers = await data.json();
        console.log(customers);
        setCustomers(customers);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setCustomers]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DataTable
        title="Customers"
        CreateButton={() => {
          return CustomerDialog({ isOpen, setIsOpen });
        }}
        columns={columns}
        data={customers}
      />
    </>
  );
}
