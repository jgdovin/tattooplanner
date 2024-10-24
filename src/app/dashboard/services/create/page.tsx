"use client";
import { createServiceMutation } from "@/lib/queries/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ServiceForm } from "@/components/forms/ServiceForm";
import ContentCard from "@/components/ContentCard";

import {
  EMPTY_SERVICE_DATA,
  serviceSchema,
  ServiceType,
} from "@/features/services/schemas/services";

export default function Page() {
  const router = useRouter();
  const client = useQueryClient();
  const createLocation = createServiceMutation({ client, router });

  const form = useForm<ServiceType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: EMPTY_SERVICE_DATA,
  });

  const submitAction = (submittedData: ServiceType) => {
    createLocation.mutate({ ...submittedData });
  };

  return (
    <ContentCard title="New Service">
      <ServiceForm form={form} isEditing={false} submitAction={submitAction} />
    </ContentCard>
  );
}
