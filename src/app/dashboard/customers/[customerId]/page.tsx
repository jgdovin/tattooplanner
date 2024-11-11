"use client";
import ContentCard from "@/components/ContentCard";
import { CreateButton } from "@/components/CreateButton";
import { DataTable } from "@/components/custom/data-table";
import { getCustomerQuery } from "@/features/customers/server/db/customers";
import { oswaldBold, ralewayBold, serif, serifBold } from "@/lib/fonts";
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

              <li>(727) 444 - 4444</li>
              <li>
                <Link href="mailto:joshgdovin@gmail.com">
                  joshgdovin@gmail.com
                </Link>
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
              url: `/dashboard/projects/new?customer=${data.id}`,
            })
          }
          data={[]}
          columns={[]}
        />
      </ContentCard>
    </>
  );
}
