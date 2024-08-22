"use client";

import { LocationType } from "@/store/location";
import Step1 from "./step1";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { fetchBookServiceAtom } from "@/store/service";
import Step2 from "./step2";

interface ClientProps {
  services: any;
  location: LocationType;
}

const steps = [
  "Select a service",
  "Select a date/time",
  "Enter your information",
  "Review & confirm",
  "Success",
];

export default function Client({ services, location }: ClientProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [service, _] = useAtom(fetchBookServiceAtom);

  useEffect(() => {
    console.log("changed");
  }, [service]);
  const increaseStep = () => {
    if (currentStep >= steps.length) return;
    setCurrentStep(currentStep + 1);
  };

  const decreaseStep = () => {
    if (currentStep <= 1) return;
    setCurrentStep(currentStep - 1);
  };
  const disableIncreaseButton = () => {
    if (currentStep >= steps.length) return true;
    if (currentStep === 1 && !service.name) return true;
    return false;
  };
  const IncreaseStepButton = () => (
    <Button
      disabled={disableIncreaseButton()}
      onClick={increaseStep}
      className="text-2xl py-6 px-8"
    >
      Next
    </Button>
  );

  const DecreaseStepButton = () => (
    <Button
      disabled={currentStep <= 1}
      onClick={decreaseStep}
      className="text-2xl py-6 px-8"
    >
      Back
    </Button>
  );

  const StepButtons = () => (
    <div className="flex justify-center w-full gap-10">
      <DecreaseStepButton />
      <IncreaseStepButton />
    </div>
  );

  const stepWrapper = (step: React.ReactElement) => {
    return (
      <div className="flex flex-col justify-center items-center w-full gap-5">
        <div className="flex justify-center w-full bg-black p-5 rounded-md">
          <h1 className="text-white text-3xl font-bold">
            Booking at {location.name}
          </h1>
        </div>
        {service && service.name}
        {step}
        <StepButtons />
      </div>
    );
  };

  if (currentStep === 1)
    return stepWrapper(
      <Step1
        services={services}
        location={location}
        increaseStep={increaseStep}
      />
    );

  if (currentStep === 2)
    return stepWrapper(<Step2 locationId={location.id || ""} />);

  return stepWrapper(<div>Step {currentStep}</div>);
}
