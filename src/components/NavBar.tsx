import Link from "next/link";

import getServerSession from "@/lib/getServerSession";
import Logo from "@/components/ui/Logo";
import { SignInWithFaceit, SignOut } from "@/components/actions";

import NextImageWithFallback from "./ui/NextImageWithFallback";

export default async function NavBar() {
  const session = getServerSession();

  return (
    <nav className="mb-4 flex h-16 w-full flex-row items-center gap-4 border-b border-b-dark-600 px-4">
      <Logo />
      <div>
        <span className="rounded-md bg-dark-600 px-2 py-1 text-sm">Beta</span>
      </div>
      <div className="ml-auto flex flex-row items-center gap-2">
        {session ? (
          <>
            <Link
              href={`/player/[nickname]`}
              as={`/player/${session.nickname}`}
              className="inline-flex items-center gap-2 rounded-md px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-gray-700"
            >
              <NextImageWithFallback
                src={session.avatar as string}
                fallbackSrc="/assets/default-avatar.svg"
                alt="Player avatar"
                width="32"
                height="32"
                className="aspect-square rounded-full border border-dark-700"
              />
              <p>{session.nickname}</p>
            </Link>
            <SignOut />
          </>
        ) : (
          <SignInWithFaceit />
        )}
      </div>
    </nav>
  );
}
