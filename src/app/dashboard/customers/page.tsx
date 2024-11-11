"use client";

import { DataTable } from "@/components/custom/data-table";
import { useState } from "react";
import ContentCard from "@/components/ContentCard";
import { CreateButton } from "@/components/CreateButton";
import { getCustomersQuery } from "@/features/customers/server/db/customers";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCustomerColumns } from "./columns";

export default function Client() {
  const { data, error, isPending } = getCustomersQuery();

  const columns = getCustomerColumns();

  if (isPending) {
    return <ContentCard>Loading...</ContentCard>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ContentCard>
      <DataTable
        title="Customers"
        CreateButton={() =>
          CreateButton({
            feature: "Customer",
            url: "/dashboard/customers/create",
          })
        }
        columns={columns}
        data={data}
      />
    </ContentCard>
  );
}
