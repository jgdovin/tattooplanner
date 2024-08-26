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
  const [hours, minutes] = duration.split(":").map(Number);
  return hours * 60 + minutes;
}

export function convertStringDurationToHoursAndMinutes(duration: string) {
  const [hours, minutes] = duration.split(":").map(Number);
  return `${hours ? `${hours} hours ` : ""}
  ${minutes ? `${minutes} minutes` : ""}`;
}

export const formatTime = (time?: string) => {
  if (!time) return "";
  return dayjs(`2024-01-01T${time}:00`).format("hh:mm A");
};
