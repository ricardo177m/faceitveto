import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    FACEIT_CLIENT_SECRET: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    STEAM_API_KEY: z.string().min(1),
    FACEIT_OPEN_API_TOKEN: z.string().min(1),
    FACEIT_DEMOS_API_TOKEN: z.string().min(1),
    EDGE_CONFIG: z.string().min(1),
    PARSER_API_KEY: z.string().min(1),
    NODE_ENV: z.enum(["development", "production"]),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url().default("/api"),
    NEXT_PUBLIC_FACEIT_CLIENT_ID: z.string().uuid(),
    NEXT_PUBLIC_PARSER_URL: z.string().url(),
    NEXT_PUBLIC_FACEIT_OPEN_API_CLIENT_TOKEN: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_FACEIT_CLIENT_ID: process.env.NEXT_PUBLIC_FACEIT_CLIENT_ID,
    NEXT_PUBLIC_PARSER_URL: process.env.NEXT_PUBLIC_PARSER_URL,
    NEXT_PUBLIC_FACEIT_OPEN_API_CLIENT_TOKEN:
      process.env.NEXT_PUBLIC_FACEIT_OPEN_API_CLIENT_TOKEN,
  },
});
