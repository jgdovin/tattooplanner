"use client";

import { DataTable } from "@/components/custom/data-table";
import { useCustomerColumns } from "./columns";
import { CustomerDialog } from "./customerDialog";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { customersAtom } from "@/store/customer";

export default function Client({ data }: any) {
  const [customers, setCustomers] = useAtom(customersAtom);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

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

  const columns = useCustomerColumns(() => {
    setIsOpen(true);
    setIsEditing(true);
  });

  return (
    <>
      <DataTable
        title="Customers"
        CreateButton={() => {
          return CustomerDialog({ isOpen, setIsOpen, isEditing, setIsEditing });
        }}
        columns={columns}
        loading={loading}
        data={customers}
      />
    </>
  );
}
