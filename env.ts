// env.ts - kontrol edin ki böyle bir yapı var mı
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_DRIZZLE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(1),
    AUTH_GOOGLE_ID: z.string().min(1),
    AUTH_GOOGLE_SECRET: z.string().min(1),
    CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
    CLOUDFLARE_ACCESS_KEY_ID: z.string().min(1),
    CLOUDFLARE_SECRET_ACCESS_KEY: z.string().min(1),
    BUCKET_NAME: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BUCKET_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_DRIZZLE_URL: process.env.AUTH_DRIZZLE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_ACCESS_KEY_ID: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    CLOUDFLARE_SECRET_ACCESS_KEY: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    BUCKET_NAME: process.env.BUCKET_NAME,
    NEXT_PUBLIC_BUCKET_URL: process.env.NEXT_PUBLIC_BUCKET_URL
  },
});
