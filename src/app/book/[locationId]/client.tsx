"use client";
import { Calendar } from "@/components/ui/calendar";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
export default function Client({ locationId }: { locationId: string }) {
  const [month, setMonth] = useState<number | undefined>(
    new Date().getMonth() + 1
  );
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<any>({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!date) return;
    const currMonth = date.getMonth() + 1;
    if (currMonth !== month) {
      setMonth(currMonth);
    }
  }, [date, month]);

  const locationAvailability = useCallback(() => {
    return fetch(`/api/location/${locationId}/availability`, {
      method: "POST",
      body: JSON.stringify({
        year: 2024,
        month,
      }),
    });
  }, [month, locationId]);

  useEffect(() => {
    if (!month || !locationId) return;
    setLoading(true);
    // request bookings for the month that could conflict
    locationAvailability().then(async (res) => {
      const data = await res.json();
      setAvailability(data.availableSlots);
      setLoading(false);
    });
  }, [month, locationId, locationAvailability]);

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