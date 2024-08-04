"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
export default function Client({ locationId }: { locationId: string }) {
  const [month, setMonth] = useState<number | undefined>(new Date().getMonth());
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (date?.getMonth() !== month) {
      if (!date) return;
      setMonth(date.getMonth() + 1);
    }
  }, [date, month]);

  useEffect(() => {
    // request bookings for the month that could conflict

    console.log("changed months ", month);
  }, [month]);
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
        </h1>
      </div>
      <div className="w-1/2 mt-5 mx-auto">
        {locationId}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          09:00
        </button>
      </div>
    </div>
  );
}
