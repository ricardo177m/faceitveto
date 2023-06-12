import { SignInWithFaceit, SignOut } from "@/components/actions";
import Logo from "@/components/ui/Logo";
import { getServerSession } from "next-auth";
import { ImageWithFallback } from "./ImageWithFallback";

export default async function TopBar() {
  const session = await getServerSession();

  return (
    <nav className="w-full border-b border-b-dark-600 h-16 px-4 mb-4 flex flex-row gap-4 items-center">
      <Logo />
      <div>
        <span className="py-1 px-2 rounded-md bg-dark-600 text-sm">Beta</span>
      </div>
      <div className="flex flex-row gap-4 items-center ml-auto">
        {session?.user ? (
          <>
            <div className="inline-flex items-center gap-2">
              <ImageWithFallback
                src={session.user.image as string}
                fallbackSrc="/assets/default-avatar.svg"
                alt="Player avatar"
                width="32"
                height="32"
                className="rounded-full border border-dark-700 aspect-square"
              />
              <p>{session.user.name}</p>
            </div>
            <SignOut />
          </>
        ) : (
          <SignInWithFaceit />
        )}
      </div>
    </nav>
  );
}
