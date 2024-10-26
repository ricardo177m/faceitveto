import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    FACEIT_CLIENT_SECRET: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    STEAM_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url().default("/api"),
    NEXT_PUBLIC_FACEIT_CLIENT_ID: z.string().uuid(),
  },
  runtimeEnv: {
    FACEIT_CLIENT_SECRET: process.env.FACEIT_CLIENT_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    STEAM_API_KEY: process.env.STEAM_API_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_FACEIT_CLIENT_ID: process.env.NEXT_PUBLIC_FACEIT_CLIENT_ID,
  },
});
