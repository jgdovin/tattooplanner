"use client";
import ContentCard from "@/components/ContentCard";
import { CreateButton } from "@/components/CreateButton";
import { DataTable } from "@/components/custom/data-table";
import { getCustomerQuery } from "@/features/customers/server/db/customers";
import { ralewayBold } from "@/lib/fonts";
import { formatPhoneNumber } from "@/lib/utils";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { use } from "react";

export default function Page(props: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = use(props.params);

  const { data, isLoading, error } = getCustomerQuery(customerId);

  if (isLoading) return <ContentCard>Loading...</ContentCard>;

  if (error) return <ContentCard>Error: {error.message}</ContentCard>;

  return (
    <>
      <ContentCard title={`${data.name} - Customer info`}>
        <div className="border border-gray-200 p-5 flex flex-row justify-between">
          <div className="w-full">
            <ul>
              <li>{data.address1}</li>
              {data.address2 && <li>{data.address2}</li>}
              {data.city && data.state && data.zip && (
                <>
                  {data.city}, {data.state} {data.zip}
                </>
              )}

              <li>{formatPhoneNumber(data.phone)}</li>
              <li>
                <Link href="mailto:joshgdovin@gmail.com">{data.email}</Link>
              </li>
              <li>
                <FontAwesomeIcon
                  className="text-green-600 w-5 h-5"
                  icon={faCheck}
                />
              </li>
            </ul>
          </div>
          <div className="w-full">
            <h3 className={`${ralewayBold.className}`}>
              Upcoming appointments
            </h3>
            <ul className="pt-5">
              <li>Tomorrow - 11:00 am</li>
              <li>Next tuesday - 3:00 pm</li>
            </ul>
          </div>
        </div>
        <div className=""></div>
      </ContentCard>
      <ContentCard title="Projects">
        <DataTable
          CreateButton={() =>
            CreateButton({
              feature: "Project",
              url: `/dashboard/projects/create?customer=${data.id}`,
            })
          }
          data={[]}
          columns={[]}
        />
      </ContentCard>
    </>
  );
}
