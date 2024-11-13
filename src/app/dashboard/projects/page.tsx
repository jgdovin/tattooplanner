"use client";
import { DataTable } from "@/components/custom/data-table";
import { getProjectColumns } from "./columns";

import ContentCard from "@/components/ContentCard";
import { CreateButton } from "@/components/CreateButton";
import { getProjectsQuery } from "@/features/projects/server/db/projects";

// TODO: update file to be for projects.

export default function Page() {
  const { data, error, isPending } = getProjectsQuery();

  const columns = getProjectColumns();

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
            feature: "Project",
            url: "/dashboard/projects/create",
          })
        }
        title="Projects"
        columns={columns}
        loading={false}
        data={data}
      />
    </ContentCard>
  );
}
