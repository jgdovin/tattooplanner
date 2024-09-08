"use client";

import Error from "next/error";

export default function MyError({ statusCode }: { statusCode: number }) {
  return (
    <div className="text-black dark:text-white">
      <Error statusCode={statusCode} />;
    </div>
  );
}
