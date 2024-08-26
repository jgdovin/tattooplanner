"use server";

import { randomUUID } from "crypto";
import { Client } from "square";
import { createPayment } from "./payment";

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT,
});

export async function submitPayment(sourceId, amount, customerId) {
  try {
    // Square requires amount to be in cents
    const squareAmount = amount * 100;
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        amount: squareAmount,
        currency: "USD",
      },
    });

    if (result.payment.status === "COMPLETED") {
      createPayment(result, customerId);
    }

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to process payment");
  }
}
