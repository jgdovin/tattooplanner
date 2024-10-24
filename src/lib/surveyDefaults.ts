"use client";

import { Serializer, setLicenseKey } from "survey-core";
import { SurveyCreator } from "survey-creator-react";
import { Action } from "survey-core";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const surveyCreatorMethodSetup = (
  creator: SurveyCreator,
  router: AppRouterInstance
) => {
  creator.sidebar.toolbar.actions.splice(
    1,
    0,
    new Action({
      id: "test",
      title: "Back To Dashboard",
      visible: true,
      visibleIndex: 1,
      action: () => {
        router.push("/dashboard/surveys");
      },
    })
  );
  creator.onSurveyInstanceCreated.add((_, options) => {
    if (options.area !== "property-grid" || options.obj?.getType() !== "survey")
      return;

    const thankyouPanel = options.survey.getPanelByName("showOnCompleted");
    if (thankyouPanel) thankyouPanel.visible = false;

    const timerPanel = options.survey.getPanelByName("timer");
    if (timerPanel) timerPanel.visible = false;

    const questionPanel = options.survey.getPanelByName("question");
    if (questionPanel) questionPanel.visible = false;

    const generalPanel = options.survey.getPanelByName("general");
    if (generalPanel) generalPanel.visible = false;
  });
};

export const surveyCreatorDefaults = () => {
  surveyLicense();
  fileUploadDefaults();
};

const fileUploadDefaults = () => {
  const showThankyouOption = Serializer.findProperty(
    "survey",
    "showCompletedPage"
  );
  showThankyouOption.defaultValue = false;
  showThankyouOption.visible = false;

  const encodeFilesIntoJsonOption = Serializer.findProperty(
    "file",
    "storeDataAsText"
  );
  encodeFilesIntoJsonOption.defaultValue = false;
  encodeFilesIntoJsonOption.visible = false;
};

const surveyLicense = () => {
  const licenseKey = process.env.NEXT_PUBLIC_SURVEYJS_PUBLIC_KEY;
  if (!licenseKey) throw new Error("SurveyJS license key not found");
  setLicenseKey(licenseKey);
};
