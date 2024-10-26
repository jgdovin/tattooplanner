"use client";
import {
  serviceSchema,
  ServiceType,
  EMPTY_SERVICE_DATA,
} from "@/features/services/schemas/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  updateServiceMutation,
  useServiceQuery,
} from "@/features/services/server/db/services";
import { ServiceForm } from "@/components/forms/ServiceForm";
import ContentCard from "@/components/ContentCard";
import { PageWithBackButton } from "@/components/PageWithBackButton";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data, isLoading, error } = useServiceQuery(id);

  const router = useRouter();
  const client = useQueryClient();
  const updateService = updateServiceMutation({ client, router });

  const form = useForm<ServiceType>({
    defaultValues: data || EMPTY_SERVICE_DATA,
    resolver: zodResolver(serviceSchema),
  });

  useEffect(() => {
    if (!data) return;
    form.reset(data);
  }, [data, form]);

  const submitAction = (submittedData: ServiceType) => {
    updateService.mutate({ ...submittedData });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <PageWithBackButton
      pageTitle="Edit Service"
      backButtonHref="/dashboard/services"
    >
      <ContentCard>
        <ServiceForm isEditing={true} form={form} submitAction={submitAction} />
      </ContentCard>
    </PageWithBackButton>
  );
}
