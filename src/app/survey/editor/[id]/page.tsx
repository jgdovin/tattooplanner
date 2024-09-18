"use client";

import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import { ICreatorOptions } from "survey-creator-core";
import { setLicenseKey, Serializer } from "survey-core";

import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import LoadingPage from "@/components/custom/LoadingPage";
import {
  getSurveyQuery,
  updateSurveyQuery,
} from "@/app/queries/dashboard/survey";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const creatorOptions: ICreatorOptions = {
  isAutoSave: true,
  showThemeTab: true,
};

const licenseKey = process.env.NEXT_PUBLIC_SURVEYJS_PUBLIC_KEY;
if (!licenseKey) throw new Error("SurveyJS license key not found");
setLicenseKey(licenseKey);

Serializer.findProperty("file", "storeDataAsText").defaultValue = false;

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const { data, isLoading } = getSurveyQuery({ id });
  const [creatorInstance, setCreatorInstance] =
    useState<SurveyCreator | null>();

  useEffect(() => {
    const creator = new SurveyCreator(creatorOptions);

    creator.onSurveyInstanceCreated.add((options) => {
      const timerPanel = options.propertyGrid.getPanelByName("timer");
      if (timerPanel) timerPanel.visible = false;
    });

    creator.saveSurveyFunc = () => {
      updateSurvey.mutate({ json: creator.JSON });
    };

    setCreatorInstance(creator);
  }, []);

  const updateSurvey = updateSurveyQuery({ id });

  // Set the creator's JSON when data is loaded
  useEffect(() => {
    if (!data || !data.json || !creatorInstance) return;

    if (JSON.stringify(data.json) === JSON.stringify(creatorInstance.JSON))
      return;

    creatorInstance.JSON = data.json;
  }, [data, creatorInstance]);

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
