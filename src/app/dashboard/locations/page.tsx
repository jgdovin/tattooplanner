"use client";
import { DataTable } from "@/components/custom/data-table";
import { getLocationColumns } from "./columns";
import {
  deleteLocationMutation,
  getArtistLocationsQuery,
} from "@/features/locations/server/db/locations";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import ContentCard from "@/components/ContentCard";
import { CreateButton } from "@/components/CreateButton";

export default function Page() {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { data, error, isPending } = getArtistLocationsQuery();
  const deleteLocation = deleteLocationMutation({ client: queryClient });

  const columns = getLocationColumns(router, deleteLocation);

  if (isPending) {
    return <ContentCard>Loading...</ContentCard>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ContentCard>
      <DataTable
        CreateButton={() =>
          CreateButton({
            feature: "Location",
            url: "/dashboard/locations/create",
          })
        }
        title="Locations"
        columns={columns}
        loading={false}
        data={data}
      />
    </ContentCard>
  );
}
