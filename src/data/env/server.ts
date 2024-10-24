import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    DATABASE_URL: z.string(),
    SURVEY_UPLOAD_BUCKET_NAME: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    EMAIL_USER: z.string(),
    EMAIL_PASS: z.string(),
    EMAIL_FROM: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    PGUSER: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
    SQUARE_ACCESS_TOKEN: z.string(),
    SQUARE_ENVIRONMENT: z.string(),
  },
  experimental__runtimeEnv: process.env,
});
