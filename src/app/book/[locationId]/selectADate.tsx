"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAtom } from "jotai";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

import {
  increaseStepAtom,
  fetchBookingDateAtom,
  fetchBookServiceAtom,
} from "@/store/checkout";
import { getLocationAvailability } from "@/actions/book";

export default function SelectADate({ locationId }: { locationId: string }) {
  const [bookingDate, setBookingDate] = useAtom(fetchBookingDateAtom);

  const [month, setMonth] = useState<number | undefined>(
    new Date().getMonth() + 1
  );
  const [year, setYear] = useState<number | undefined>(
    new Date().getFullYear()
  );
  const [date, setDate] = useState<Date | undefined>(bookingDate || new Date());
  const [availability, setAvailability] = useState<any>({});
  const [disabledDays, setDisabledDays] = useState<number[]>([]);
  const [filledDays, setFilledDays] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [service] = useAtom(fetchBookServiceAtom);

  const [, increaseStep] = useAtom(increaseStepAtom);

  useEffect(() => {
    if (!date) return;

    const selectedDate = typeof date === "string" ? new Date(date) : date;

    const currMonth = selectedDate.getMonth() + 1;
    if (currMonth !== month) {
      setMonth(currMonth);
    }

    if (selectedDate.getFullYear() !== year) {
      setYear(selectedDate.getFullYear());
    }
  }, [date, month, year]);

  useEffect(() => {
    if (!month || !locationId) return;

    setLoading(true);
    // request bookings for the month that could conflict
    getLocationAvailability(locationId, {
      year,
      month,
      serviceId: service.id,
    }).then(async (res) => {
      const data = await res;

      if (data.filledDays) setFilledDays(data.filledDays);
      if (data.disabledDays.length) setDisabledDays(data.disabledDays);

      setAvailability(data.availableSlots);
      setLoading(false);
    });
  }, [month, locationId, service, service.id, year]);

  const currAvailability = availability[dayjs(date).format("YYYY-MM-DD")];

  return (
    <div>
      <div className="max-w-min mx-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          modifiers={{
            unavailable: [{ dayOfWeek: disabledDays }, ...filledDays],
          }}
          modifiersClassNames={{ unavailable: "text-gray-400" }}
          className="rounded-md border"
          disabled={[{ before: new Date() }]}
        />
        <h1 className="text-lg font-bold">
          {dayjs(date).format("ddd MMM DD")}

          {loading ? (
            <div className="w-full flex flex-col h-32 justify-center">
              <div className="loader w-10 self-center"></div>
            </div>
          ) : currAvailability ? (
            <div className="flex flex-col">
              {currAvailability.map((slot: any, index: number) => {
                const day = dayjs(slot.from);
                const time = day.format("h:mm A");
                const militaryTime = day.format("HH:mm");
                const bookingTime = dayjs(bookingDate).format("h:mm A");
                const active = bookingTime === time;

                return (
                  <Button
                    variant="outline"
                    key={index}
                    className={`${active && "bg-accent"} block`}
                    onClick={() => {
                      setBookingDate({ date: date!, time: militaryTime });
                      increaseStep();
                    }}
                  >
                    {time}
                  </Button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col justify-center">
              <span className="block w-max-min self-center">
                No Availability
              </span>
            </div>
          )}
        </h1>
      </div>
    </div>
  );
}
