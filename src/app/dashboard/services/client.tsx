"use client";
import { DataTable } from "@/components/custom/data-table";
import { useServiceColumns } from "./columns";
import { getArtistLocationsQuery } from "@/lib/queries/location";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Client() {
  const router = useRouter();

  const { data, error, isPending } = getArtistLocationsQuery();

  const columns = useServiceColumns();

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
