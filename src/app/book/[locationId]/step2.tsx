"use client";

import { Calendar } from "@/components/ui/calendar";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { fetchBookServiceAtom } from "@/store/service";
import { useAtom } from "jotai";
export default function Step2({ locationId }: { locationId: string }) {
  const [month, setMonth] = useState<number | undefined>(
    new Date().getMonth() + 1
  );
  const [year, setYear] = useState<number | undefined>(
    new Date().getFullYear()
  );
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<any>({});

  const [loading, setLoading] = useState(true);
  const [service] = useAtom(fetchBookServiceAtom);

  useEffect(() => {
    if (!date) return;

    const currMonth = date.getMonth() + 1;
    if (currMonth !== month) {
      setMonth(currMonth);
    }

    if (date.getFullYear() !== year) {
      setYear(date.getFullYear());
    }
  }, [date, month]);

  useEffect(() => {
    if (!month || !locationId) return;
    const locationAvailability = () => {
      return fetch(`/api/book/${locationId}/availability`, {
        method: "POST",
        body: JSON.stringify({
          year,
          month,
          serviceId: service.id,
        }),
      });
    };
    setLoading(true);
    // request bookings for the month that could conflict
    locationAvailability().then(async (res) => {
      const data = await res.json();
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
          className="rounded-md border"
        />
        <h1 className="text-lg font-bold">
          {dayjs(date).format("ddd MMM DD")}

          {loading ? (
            <div className="w-full flex flex-col h-32 justify-center">
              <div className="loader w-10 self-center"></div>
            </div>
          ) : currAvailability ? (
            <div className="flex flex-col">
              {currAvailability.map((slot: any, index: number) => (
                <Button variant="outline" key={index} className="block">
                  {dayjs(slot.from).format("h:mm A")}
                </Button>
              ))}
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
