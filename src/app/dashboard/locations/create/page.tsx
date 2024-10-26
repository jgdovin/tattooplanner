"use client";
import { LocationForm } from "@/features/locations/components/forms/LocationForm";
import { createLocationMutation } from "@/features/locations/server/db/locations";
import {
  EMPTY_LOCATION_DATA,
  locationSchema,
  type LocationType,
} from "@/features/locations/schemas/locations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ContentCard from "@/components/ContentCard";
import { PageWithBackButton } from "@/components/PageWithBackButton";

export default function NewLocationPage() {
  const router = useRouter();
  const client = useQueryClient();
  const createLocation = createLocationMutation({ client, router });

  const form = useForm<LocationType>({
    resolver: zodResolver(locationSchema),
    defaultValues: EMPTY_LOCATION_DATA,
  });

  const submitAction = (submittedData: LocationType) => {
    createLocation.mutate({ ...submittedData });
  };

  return (
    <PageWithBackButton
      pageTitle="New Location"
      backButtonHref="/dashboard/locations"
    >
      <ContentCard>
        <LocationForm
          form={form}
          isEditing={false}
          submitAction={submitAction}
        />
      </ContentCard>
    </PageWithBackButton>
  );
}
