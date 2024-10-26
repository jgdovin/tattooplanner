"use client";
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
import { createServiceMutation } from "@/features/services/server/db/services";
import { PageWithBackButton } from "@/components/PageWithBackButton";

export default function Page() {
  const router = useRouter();
  const client = useQueryClient();
  const createService = createServiceMutation({ client, router });

  const form = useForm<ServiceType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: EMPTY_SERVICE_DATA,
  });

  const submitAction = (submittedData: ServiceType) => {
    createService.mutate({ ...submittedData });
  };

  return (
    <PageWithBackButton
      pageTitle="New Service"
      backButtonHref="/dashboard/services"
    >
      <ContentCard>
        <ServiceForm
          form={form}
          isEditing={false}
          submitAction={submitAction}
        />
      </ContentCard>
    </PageWithBackButton>
  );
}
