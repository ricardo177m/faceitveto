"use server";

import { cookies } from "next/dist/client/components/headers";
import jwt from "jsonwebtoken";

import { config } from "@/config/config";

const getServerSession = () => {
  const cookie = cookies().get(config.cookies.token);
  const token = cookie?.value as string;

  if (!token) return null;

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return null;

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded as Session;
  } catch (error) {
    return null;
  }
};

export default getServerSession;
