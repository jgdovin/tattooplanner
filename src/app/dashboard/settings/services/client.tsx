"use client";
import { DataTable } from "@/components/custom/data-table";
import { useServiceColumns } from "./columns";
import { ServiceDialog } from "./serviceDialog";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { fetchServices, servicesAtom } from "@/store/service";

export default function Client() {
  const [services, setServices] = useAtom(servicesAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const columns = useServiceColumns();

  return (
    <DataTable
      CreateButton={() => ServiceDialog({ isOpen, setIsOpen })}
      title="Services"
      columns={columns}
      loading={loading}
      data={services}
    />
  );
}
