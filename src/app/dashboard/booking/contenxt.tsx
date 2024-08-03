"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
export default function Content() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  useEffect(() => {
    console.log(date);
  }, [date]);
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          09:00
        </button>
      </div>
    </div>
  );
}
