import { env } from "@/env";

const getSession = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/session`, {
    cache: "no-store",
  });
  if (response.status !== 200) return null;
  const data = await response.json();
  return data as Session;
};

export default getSession;
