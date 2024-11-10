"use client";;
import { use } from "react";

import { getSurveyQuery } from "@/lib/queries/survey";
import { Survey } from "survey-react-ui";
import { Model, Serializer } from "survey-core";
import "survey-core/defaultV2.min.css";
import { surveyHandler } from "@/lib/surveyHandler";
Serializer.findProperty("file", "storeDataAsText").defaultValue = false;

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { id } = params;

  const { isPending, error, data, isFetching } = getSurveyQuery({
    id,
  });

  if (error) return <div>Error: {error.message}</div>;

  if (isPending || isFetching) return <div>Loading...</div>;

  const survey = new Model(data.json);

  surveyHandler(survey, false);

  return <Survey model={survey} />;
}
