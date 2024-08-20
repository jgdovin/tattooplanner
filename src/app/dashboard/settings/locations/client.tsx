"use client";
import { DataTable } from "@/components/custom/data-table";
import { useLocationColumns } from "./columns";
import { LocationDialog } from "./locationDialog";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { locationsAtom } from "@/store/location";

export default function Client() {
  const [locations, setLocations] = useAtom(locationsAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/location")
      .then(async (data) => {
        setLocations(await data.json());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setLocations]);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const columns = useLocationColumns(() => {
    setIsOpen(true);
    setIsEditing(true);
  });

  return (
    <DataTable
      CreateButton={() =>
        LocationDialog({ isOpen, setIsOpen, isEditing, setIsEditing })
      }
      title="Locations"
      columns={columns}
      loading={loading}
      data={locations}
    />
  );
}
