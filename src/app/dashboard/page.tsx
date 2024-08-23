"use client";

// @ts-ignore: Unreachable code error
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

import { submitPayment } from "@/actions/square";
export default function Home() {
  return (
    <PaymentForm
      applicationId="sandbox-sq0idb-4Xm1JdMbmVCNLMqexhb7rA"
      locationId="LK6H4ZEKC70XF"
      cardTokenizeResponseReceived={async (token: any) => {
        const result = await submitPayment(token.token);
        console.log(result);
      }}
    >
      <CreditCard />
    </PaymentForm>
  );
}
