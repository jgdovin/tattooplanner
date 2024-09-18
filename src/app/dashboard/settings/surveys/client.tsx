"use client";
import { DataTable } from "@/components/custom/data-table";
import { useSurveyColumns } from "./columns";

import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  createSurveyQuery,
  deleteSurveyQuery,
  getSurveysQuery,
} from "@/app/queries/dashboard/survey";

export default function Client() {
  const queryClient = useQueryClient();

  const createSurvey = createSurveyQuery({ client: queryClient });

  const deleteSurvey = deleteSurveyQuery({ client: queryClient });

  const { isPending, error, data, isFetching, isSuccess } = getSurveysQuery();

  if (error) return <div>Error: {error.message}</div>;

  const CreateButton = () => {
    return (
      <Button
        variant="outline"
        onClick={() => {
          createSurvey.mutate({ name: "New Survey", json: {} });
        }}
      >
        Create Survey
      </Button>
    );
  };

  const columns = useSurveyColumns({ deleteSurvey: deleteSurvey.mutate });

  return (
    <DataTable
      CreateButton={CreateButton}
      title="Services"
      columns={columns}
      loading={isFetching || isPending}
      data={data}
    />
  );
}
