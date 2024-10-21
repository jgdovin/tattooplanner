"use client";
import { DataTable } from "@/components/custom/data-table";
import { useLocationColumns } from "./columns";
import {
  deleteLocationMutation,
  getArtistLocationsQuery,
} from "@/lib/queries/location";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";

export default function Client() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, error, isPending } = getArtistLocationsQuery();
  const deleteLocation = deleteLocationMutation({ client: queryClient });

  const columns = useLocationColumns(router, deleteLocation);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const CreateButton = () => (
    <Button
      variant="outline"
      onClick={() => router.push(`/dashboard/locations/create`)}
    >
      Create Location <FontAwesomeIcon className="pl-1" icon={faPlus} />
    </Button>
  );

  return (
    <DataTable
      CreateButton={CreateButton}
      title="Locations"
      columns={columns}
      loading={false}
      data={data}
    />
  );
}
