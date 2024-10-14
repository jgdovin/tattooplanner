"use client";
import { createLocationMutation } from "@/dashboard/location";
import { LocationForm, EMPTY_LOCATION_DATA } from "@/forms/locationForm";
import { formSchema, LocationType } from "@/types/location";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Page() {
  const router = useRouter();
  const client = useQueryClient();
  const createLocation = createLocationMutation({ client, router });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: EMPTY_LOCATION_DATA,
  });

  const submitAction = (submittedData: LocationType) => {
    createLocation.mutate({ ...submittedData });
  };

  return (
    <LocationForm form={form} isEditing={false} submitAction={submitAction} />
  );
}
