"use server";

import { randomUUID } from "crypto";
import { Client } from "square";

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT,
});

export async function submitPayment(sourceId, amount) {
  try {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        amount,
        currency: "USD",
      },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to process payment");
  }
}
