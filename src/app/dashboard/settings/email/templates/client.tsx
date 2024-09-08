"use client";
import { DataTable } from "@/components/custom/data-table";
import { useTemplateColumns as useTemplateColumns } from "./columns";
import { TemplateDialog } from "./templateDialog";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { getTemplates } from "@/actions/emailTemplate";
import { EmailTemplateType, templatesAtom } from "@/store/emailTemplate";

export default function Client() {
  const [templates, setTemplates] = useAtom(templatesAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTemplates()
      .then(async (data) => {
        if (!data) {
          setTemplates([] as EmailTemplateType[]);
          setLoading(false);
          return;
        }

        setTemplates(data as EmailTemplateType[]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setTemplates]);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const columns = useTemplateColumns(() => {
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
      data={templates}
    />
  );
}
