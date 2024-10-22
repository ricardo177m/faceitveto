import getServerSession from "@/lib/getServerSession";
import GuestHome from "@/components/Home/GuestHome";
import UserHome from "@/components/Home/UserHome";

export default async function Home() {
  const session = await getServerSession();
  return session ? <UserHome session={session} /> : <GuestHome />;
}
