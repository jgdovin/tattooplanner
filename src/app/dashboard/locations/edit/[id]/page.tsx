"use client";
import {
  updateLocationMutation,
  useLocationQuery,
} from "@/lib/queries/location";
import {
  EMPTY_LOCATION_DATA,
  LocationForm,
} from "@/components/forms/locationForm";
import { formSchema, LocationType } from "@/lib/types/location";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data, isLoading, error } = useLocationQuery(id);

  const router = useRouter();
  const client = useQueryClient();
  const updateLocation = updateLocationMutation({ client, router });

  const form = useForm({
    defaultValues: data || EMPTY_LOCATION_DATA,
    resolver: zodResolver(formSchema),
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
    <LocationForm isEditing={true} form={form} submitAction={submitAction} />
  );
}