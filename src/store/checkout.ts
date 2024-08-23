import { atom } from "jotai";

const currentStep = atom(1);
const maxSteps = 5;

const increaseStep = atom(null, (get, set) => {
  if (get(currentStep) >= maxSteps) return;
  set(currentStep, get(currentStep) + 1);
});
const decreaseStep = atom(null, (get, set) => {
  if (get(currentStep) <= 1) return;
  set(currentStep, get(currentStep) - 1);
});
