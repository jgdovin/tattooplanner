"use client";

import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import { ICreatorOptions } from "survey-creator-core";
import { useRouter } from "next/navigation";

import LoadingPage from "@/components/custom/LoadingPage";
import { useEffect, useState, use } from "react";
import {
  surveyCreatorDefaults,
  surveyCreatorMethodSetup,
} from "@/lib/surveyDefaults";

import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import {
  getSurveyQuery,
  updateSurveyMutation,
} from "@/features/surveys/server/db/surveys";

const creatorOptions: ICreatorOptions = {
  isAutoSave: true,
  showThemeTab: true,
  questionTypes: [
    "radiogroup",
    "checkbox",
    "dropdown",
    "tagbox",
    "boolean",
    "file",
    "comment",
    "text",
    "html",
    "image",
    "signaturepad",
  ],
};

surveyCreatorDefaults();

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { id } = params;
  const { data, isLoading } = getSurveyQuery({ id });
  const [creatorInstance, setCreatorInstance] =
    useState<SurveyCreator | null>();
  const router = useRouter();
  const updateSurvey = updateSurveyMutation({ id });
  useEffect(() => {
    const creator = new SurveyCreator(creatorOptions);
    surveyCreatorMethodSetup(creator, router);

    creator.saveSurveyFunc = () => {
      updateSurvey.mutate({ json: creator.JSON });
    };

    setCreatorInstance(creator);
  }, []);

  // Set the creator's JSON when data is loaded
  useEffect(() => {
    if (!data || !data.json || !creatorInstance) return;

    if (JSON.stringify(data.json) === JSON.stringify(creatorInstance.JSON))
      return;

    creatorInstance.JSON = data.json;
  }, [data]);

  if (isLoading || !creatorInstance) return <LoadingPage />;

  return (
    <div className="h-screen flex justify-center relative">
      <SurveyCreatorComponent creator={creatorInstance} />
    </div>
  );
}
