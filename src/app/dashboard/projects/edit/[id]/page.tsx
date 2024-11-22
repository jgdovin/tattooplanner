"use client";
import {
  updateLocationMutation,
  getLocationsQuery,
} from "@/features/locations/server/db/locations";
import { LocationForm } from "@/features/locations/components/forms/LocationForm";
import {
  EMPTY_LOCATION_DATA,
  locationSchema,
  LocationType,
} from "@/features/locations/schemas/locations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, use } from "react";
import { useForm } from "react-hook-form";
import ContentCard from "@/components/ContentCard";
import { PageWithBackButton } from "@/components/PageWithBackButton";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { id } = params;

  const { data, isLoading, error } = getLocationsQuery(id);

  const router = useRouter();
  const client = useQueryClient();
  const updateLocation = updateLocationMutation({ client, router });

  const form = useForm<LocationType>({
    defaultValues: data || EMPTY_LOCATION_DATA,
    resolver: zodResolver(locationSchema),
  });

  useEffect(() => {
    if (!data) return;
    form.reset(data);
  }, [data, form]);

  const submitAction = (submittedData: LocationType) => {
    updateLocation.mutate({ ...submittedData });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <PageWithBackButton
      pageTitle="Edit Location"
      backButtonHref="/dashboard/locations"
    >
      <ContentCard>
        <LocationForm
          isEditing={true}
          form={form}
          submitAction={submitAction}
        />
      </ContentCard>
    </PageWithBackButton>
  );
}
