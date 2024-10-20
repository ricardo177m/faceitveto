import getServerSession from "@/lib/getServerSession";
import GuestHome from "@/components/Home/GuestHome";
import UserHome from "@/components/Home/UserHome";

export default function Home() {
  const session = getServerSession();
  return session ? <UserHome session={session} /> : <GuestHome />;
}
