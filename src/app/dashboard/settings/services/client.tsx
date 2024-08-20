"use client";
import { DataTable } from "@/components/custom/data-table";
import { useServiceColumns } from "./columns";
import { ServiceDialog } from "./serviceDialog";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { servicesAtom } from "@/store/service";

export default function Client() {
  const [services, setServices] = useAtom(servicesAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/service")
      .then(async (data) => {
        setServices(await data.json());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setServices]);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const columns = useServiceColumns(() => {
    setIsOpen(true);
    setIsEditing(true);
  });

  return (
    <DataTable
      CreateButton={() =>
        ServiceDialog({ isOpen, setIsOpen, isEditing, setIsEditing })
      }
      title="Services"
      columns={columns}
      loading={loading}
      data={services}
    />
  );
}
