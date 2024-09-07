"use client";
import { DataTable } from "@/components/custom/data-table";
import { useLocationColumns } from "./columns";
import { TemplateDialog } from "./templateDialog";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { locationsAtom, LocationType } from "@/store/location";
import { getEmailTemplates } from "@/actions/emailTemplate";

export default function Client() {
  const [locations, setLocations] = useAtom(locationsAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmailTemplates()
      .then(async (data) => {
        if (!data) {
          setLocations([] as LocationType[]);
          setLoading(false);
          return;
        }

        setLocations(data as LocationType[]);
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
        TemplateDialog({ isOpen, setIsOpen, isEditing, setIsEditing })
      }
      title="Email Templates"
      columns={columns}
      loading={loading}
      data={locations}
    />
  );
}
