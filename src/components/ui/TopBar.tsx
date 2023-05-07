import { SignInWithFaceit, SignOut } from "@/components/actions";
import Logo from "@/components/ui/Logo";
import { getServerSession } from "next-auth";

export default async function TopBar() {
  const session = await getServerSession();

  return (
    <nav className="w-full border-b border-b-dark-600 h-16 px-4 mb-4 flex flex-row gap-4 items-center">
      <Logo />
      <div>
        <span className="py-1 px-2 rounded-md bg-dark-600 text-sm">Beta</span>
      </div>
      <div>
        {session?.user ? (
          <>
            <p>{session.user.name}</p> <SignOut />
          </>
        ) : (
          <SignInWithFaceit />
        )}
      </div>
    </nav>
  );
}
