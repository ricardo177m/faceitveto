const getSession = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/session`,
    { cache: "no-store" }
  );
  const data = await response.json();
  if (response.status !== 200) return null;
  return data as Session;
};

export default getSession;
