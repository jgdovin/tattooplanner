"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ContentCard from "@/components/ContentCard";
import { PageWithBackButton } from "@/components/PageWithBackButton";
import { CustomerForm } from "@/features/customers/components/forms/CustomerForm";
import { createCustomerMutation } from "@/features/customers/server/db/customers";
import { CustomerType } from "@/features/customers/schemas/customers";

export default function NewCustomerPage() {
  const router = useRouter();
  const client = useQueryClient();
  const creeateCustomer = createCustomerMutation({ client, router });

  const submitAction = (submittedData: CustomerType) => {
    console.log(submittedData);
    creeateCustomer.mutate({ ...submittedData });
  };

  return (
    <PageWithBackButton
      pageTitle="New Customer"
      backButtonHref="/dashboard/customers"
    >
      <ContentCard>
        <CustomerForm submitAction={submitAction} />
      </ContentCard>
    </PageWithBackButton>
  );
}
