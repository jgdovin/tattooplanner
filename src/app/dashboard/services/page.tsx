"use client";
import { DataTable } from "@/components/custom/data-table";
import { getServiceColumns } from "./columns";
import {
  deleteServiceMutation,
  getArtistServicesQuery,
} from "@/features/services/server/db/services";
import { useRouter } from "next/navigation";
import { CreateButton } from "@/components/CreateButton";
import { useQueryClient } from "@tanstack/react-query";
import ContentCard from "@/components/ContentCard";

export default function Client() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, error, isPending } = getArtistServicesQuery();
  const deleteService = deleteServiceMutation({ client: queryClient });

  const columns = getServiceColumns(router, deleteService);

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
            feature: "Service",
            url: "/dashboard/services/create",
          })
        }
        title="Services"
        columns={columns}
        loading={false}
        data={data}
      />
    </ContentCard>
  );
}
