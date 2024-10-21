"use client";
import { createServiceMutation } from "@/lib/queries/service";
import { ServiceType, formSchema } from "@/lib/types/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { EMPTY_SERVICE_DATA } from "@/lib/types/service";
import { ServiceForm } from "@/components/forms/serviceForm";

export default function Page() {
  const router = useRouter();
  const client = useQueryClient();
  const createLocation = createServiceMutation({ client, router });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: EMPTY_SERVICE_DATA,
  });

  const submitAction = (submittedData: ServiceType) => {
    createLocation.mutate({ ...submittedData });
  };

  return (
    <ServiceForm form={form} isEditing={false} submitAction={submitAction} />
  );
}
