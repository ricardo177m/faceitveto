import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { config } from "@/config/config";
import { env } from "@/env.mjs";

const getServerSession = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(config.cookies.token);
  const token = cookie?.value as string;

  if (!token) return null;

  const jwtSecret = env.JWT_SECRET;
  if (!jwtSecret) return null;

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded as Session;
  } catch (error) {
    return null;
  }
};

export default getServerSession;
