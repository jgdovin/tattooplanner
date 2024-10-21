"use client";

import {
  EmailTemplateForm,
  formSchema,
} from "@/components/forms/emailTemplateForm";
import { updateTemplateAtom } from "@/lib/store/emailTemplate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Client({
  template,
}: {
  template: {
    id: string;
    name: string;
    subject: string;
    body: string;
    global: boolean;
  };
}) {
  const [, updateTemplate] = useAtom(updateTemplateAtom);

  const form = useForm<any>({
    defaultValues: template,
    resolver: zodResolver(formSchema),
  });
  const handleSubmit = (submittedData: z.infer<typeof formSchema>) => {
    // debounce the submit
    setTimeout(() => {
      updateTemplate(submittedData!);
    }, 1000);
  };

  return (
    <div className="w-full">
      <EmailTemplateForm
        form={form}
        isEditing={true}
        submitAction={handleSubmit}
      />
    </div>
  );
}
