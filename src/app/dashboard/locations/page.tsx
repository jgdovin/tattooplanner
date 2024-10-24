"use client";
import { DataTable } from "@/components/custom/data-table";
import { getLocationColumns } from "@/features/locations/components/columns";
import {
  deleteLocationMutation,
  getArtistLocationsQuery,
} from "@/features/locations/server/db/location";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import ContentCard from "@/components/ContentCard";

export default function Page() {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { data, error, isPending } = getArtistLocationsQuery();
  const deleteLocation = deleteLocationMutation({ client: queryClient });

  const columns = getLocationColumns(router, deleteLocation);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const CreateButton = () => (
    <Button
      variant="outline"
      onClick={() => router.push(`/dashboard/locations/new`)}
    >
      Create Location <FontAwesomeIcon className="pl-1" icon={faPlus} />
    </Button>
  );

  return (
    <ContentCard>
      <DataTable
        CreateButton={CreateButton}
        title="Locations"
        columns={columns}
        loading={false}
        data={data}
      />
    </ContentCard>
  );
}
