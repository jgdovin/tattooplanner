"use client";
import { DataTable } from "@/components/custom/data-table";
import { useSurveyColumns } from "./columns";

import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  createSurveyMutation,
  deleteSurveyQuery,
  getSurveysQuery,
} from "@/lib/queries/survey";
import ContentCard from "@/components/ContentCard";
import { CreateButton } from "@/components/CreateButton";

export default function Client() {
  const queryClient = useQueryClient();

  const createSurvey = createSurveyMutation({ client: queryClient });

  const deleteSurvey = deleteSurveyQuery({ client: queryClient });

  const { isPending, error, data, isFetching } = getSurveysQuery();

  if (error) return <div>Error: {error.message}</div>;

  // const CreateButton = () => {
  //   return (
  //     <Button
  //       variant="outline"
  //       onClick={() => {
  //         createSurvey.mutate({ name: "New Survey", json: {} });
  //       }}
  //     >
  //       Create Survey
  //     </Button>
  //   );
  // };

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
