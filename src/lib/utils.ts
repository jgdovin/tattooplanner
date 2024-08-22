import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysInMonth({ year, month }: { year: string; month: string }) {
  return new Date(parseInt(year), parseInt(month), 0).getDate();
}

export function convertStringDurationToMinutes(duration: string) {
  console.log(duration);
  const [hours, minutes] = duration.split(":").map(Number);
  console.log(hours * 60 + minutes);
  return hours * 60 + minutes;
}

export const formatTime = (time?: string) => {
  if (!time) return "";
  return dayjs(`2024-08-20T${time}:00`).format("hh:mm A");
};
