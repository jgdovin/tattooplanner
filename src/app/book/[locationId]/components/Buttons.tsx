"use client";

import { Button } from "@/components/ui/button";
import {
  currentStepAtom,
  decreaseStepAtom,
  increaseStepAtom,
  maxSteps,
  fetchBookServiceAtom,
  clearCheckoutAtom,
} from "@/lib/store/checkout";
import { useAtom } from "jotai";

export const IncreaseStepButton = () => {
  const [currentStep] = useAtom(currentStepAtom);
  const [service] = useAtom(fetchBookServiceAtom);

  const [, increaseStep] = useAtom(increaseStepAtom);

  const disableIncreaseButton = () => {
    if (currentStep >= maxSteps) return true;
    if (currentStep === 1 && !service.name) return true;
    return false;
  };

  return (
    <Button
      disabled={disableIncreaseButton()}
      onClick={increaseStep}
      className={`${currentStep >= maxSteps && "hidden"} text-2xl py-6 px-8`}
    >
      Next
    </Button>
  );
};

export const DecreaseStepButton = () => {
  const [currentStep] = useAtom(currentStepAtom);
  const [, decreaseStep] = useAtom(decreaseStepAtom);
  return (
    <Button
      disabled={currentStep <= 1}
      onClick={decreaseStep}
      className="text-2xl py-6 px-8"
    >
      Back
    </Button>
  );
};

export const ClearSelectionsButton = () => {
  const [, clearSelections] = useAtom(clearCheckoutAtom);
  return (
    <Button
      className="text-2xl py-6 px-8"
      onClick={() => {
        const confirm = window.confirm(
          "Are you sure you want to clear your selections?"
        );
        if (!confirm) return;
        clearSelections();
      }}
    >
      Clear
    </Button>
  );
};
