import dayjs from "dayjs";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { EMPTY_SERVICE_DATA } from "./service";

const steps = ["Select a service", "Select a date/time", "Checkout"];

export const currentStepAtom = atomWithStorage("currentStep", 1);
export const currentServiceAtom = atomWithStorage(
  "currentService",
  EMPTY_SERVICE_DATA
);
export const maxSteps = 5;
export const bookingDateAtom = atomWithStorage<Date | undefined>(
  "bookingDate",
  undefined
);
export const successAtom = atom(false);

export const increaseStepAtom = atom(null, (get, set) => {
  if (get(currentStepAtom) >= maxSteps) return;
  set(currentStepAtom, get(currentStepAtom) + 1);
});

export const decreaseStepAtom = atom(null, (get, set) => {
  if (get(currentStepAtom) <= 1) return;
  set(currentStepAtom, get(currentStepAtom) - 1);
});

export const fetchBookingDateAtom = atom(
  (get) => get(bookingDateAtom),
  (_, set, { date, time }: { date: Date; time: string }) => {
    if (!date) {
      set(bookingDateAtom, undefined);
      return;
    }

    const newDate = dayjs(date)
      .set("hour", parseInt(time.split(":")[0]))
      .set("minute", parseInt(time.split(":")[1]));
    set(bookingDateAtom, newDate.toDate());
  }
);

export const fetchBookServiceAtom = atom(
  (get) => get(currentServiceAtom),
  async (_, set, serviceId: string) => {
    if (!serviceId) {
      set(currentServiceAtom, EMPTY_SERVICE_DATA);
      return;
    }
    const res = await fetch(`/api/book/service/${serviceId}`);
    const data = await res.json();

    set(currentServiceAtom, data);
  }
);

export const clearSelectionsAtom = atom(null, async (get, set) => {
  set(currentServiceAtom, EMPTY_SERVICE_DATA);
  set(bookingDateAtom, undefined);
  set(currentStepAtom, 1);
});
