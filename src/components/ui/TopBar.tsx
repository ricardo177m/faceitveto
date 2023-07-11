import { SignInWithFaceit, SignOut } from "@/components/actions";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import Logo from "@/components/ui/Logo";
import getServerSession from "@/lib/getServerSession";

export default async function TopBar() {
  const session = getServerSession();

  return (
    <nav className="w-full border-b border-b-dark-600 h-16 px-4 mb-4 flex flex-row gap-4 items-center">
      <Logo />
      <div>
        <span className="py-1 px-2 rounded-md bg-dark-600 text-sm">Beta</span>
      </div>
      <div className="flex flex-row gap-4 items-center ml-auto">
        {session ? (
          <>
            <div className="inline-flex items-center gap-2">
              <ImageWithFallback
                src={session.avatar}
                fallbackSrc="/assets/default-avatar.svg"
                alt="Player avatar"
                width="32"
                height="32"
                className="rounded-full border border-dark-700 aspect-square"
              />
              <p>{session.nickname}</p>
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
