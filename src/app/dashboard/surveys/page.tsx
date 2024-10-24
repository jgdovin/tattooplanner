"use client";
import { DataTable } from "@/components/custom/data-table";
import { useSurveyColumns } from "./columns";

import { useQueryClient } from "@tanstack/react-query";

import ContentCard from "@/components/ContentCard";
import { CreateButton } from "@/components/CreateButton";
import {
  createSurveyMutation,
  deleteSurveyQuery,
  getSurveysQuery,
} from "@/features/surveys/server/db/surveys";

export default function Client() {
  const queryClient = useQueryClient();

  const createSurvey = createSurveyMutation({ client: queryClient });

  const deleteSurvey = deleteSurveyQuery({ client: queryClient });

  const { isPending, error, data, isFetching } = getSurveysQuery();

  if (error) return <div>Error: {error.message}</div>;

  const columns = useSurveyColumns({ deleteSurvey: deleteSurvey.mutate });

  return (
    <ContentCard>
      <DataTable
        CreateButton={() =>
          CreateButton({
            feature: "Service",
            clickHandler: () => {
              console.log("hello");
              createSurvey.mutate({ name: "New Survey", json: {} });
            },
          })
        }
        title="Surveys"
        columns={columns}
        loading={isFetching || isPending}
        data={data}
      />
    </ContentCard>
  );
}
