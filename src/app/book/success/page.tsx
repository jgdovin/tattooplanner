"use client";
import { clearCheckoutAtom, successAtom } from "@/lib/store/checkout";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [success] = useAtom(successAtom);
  const [message, setMessage] = useState("");
  const [, clearCheckout] = useAtom(clearCheckoutAtom);

  const [noSuccess, setNoSuccess] = useState(false);
  useEffect(() => {
    if (!success && !message) setNoSuccess(true);
    setMessage("Your booking was successful!");
    clearCheckout();
  }, [success, clearCheckout, message]);

  if (noSuccess) {
    redirect("/404");
  }

  return (
    message && (
      <div>
        <h1>Success</h1>
        <p>Thank you for booking with us!</p>
        <p>{message}</p>
      </div>
    )
  );
}
