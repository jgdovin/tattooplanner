import dayjs from "dayjs";
import { atom } from "jotai";

const steps = ["Select a service", "Select a date/time", "Checkout"];

export const currentStepAtom = atom(1);
export const maxSteps = 5;
export const bookingDateAtom = atom<Date | undefined>(undefined);
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
