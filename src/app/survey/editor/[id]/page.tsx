"use client";

import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import { ICreatorOptions } from "survey-creator-core";
import { useRouter } from "next/navigation";

import LoadingPage from "@/components/custom/LoadingPage";
import {
  getSurveyQuery,
  updateSurveyQuery,
} from "@/app/queries/dashboard/survey";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  surveyCreatorDefaults,
  surveyCreatorMethodSetup,
} from "@/lib/surveyDefaults";

import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

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

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const { data, isLoading } = getSurveyQuery({ id });
  const [creatorInstance, setCreatorInstance] =
    useState<SurveyCreator | null>();

  const updateSurvey = updateSurveyQuery({ id });
  useEffect(() => {
    const creator = new SurveyCreator(creatorOptions);
    surveyCreatorMethodSetup(creator);

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
      <div className="absolute right-0 top-0 w-32 h-32 p-5 flex flex-col justify-end group">
        <Button
          className="w-12 h-12 font-bold text-2xl invisible group-hover:visible"
          onClick={() => {
            router.push("/dashboard/settings/surveys");
          }}
        >
          X
        </Button>
      </div>
    </div>
  );
}
