import { Suspense } from "react";

import CurrentMatchLink from "../CurrentMatchLink";
import PlayerLastMatches from "../PlayerLastMatches";
import PlayerLastMatchesSkeleton from "../PlayerLastMatchesSkeleton";
import Search from "../Search";

interface UserHomeProps {
  session: Session;
}

export default function UserHome({ session }: UserHomeProps) {
  return (
    <main className="mx-auto max-w-6xl">
      <h1 className="mt-8 text-3xl font-bold">Hello {session.nickname}</h1>

      <section className="my-4">
        {/* @ts-expect-error Async Server Component */}
        <CurrentMatchLink player={session} yourMatch />
      </section>

      <Suspense
        fallback={
          <PlayerLastMatchesSkeleton player={session} size={1} self={true} />
        }
      >
        {/* @ts-expect-error Async Server Component */}
        <PlayerLastMatches player={session} size={1} self={true} />
      </Suspense>

      {/* <section className="mt-6 flex flex-col gap-8">
        <h2 className="mb-4 text-2xl font-bold">Your Team</h2>
      </section> */}

      <section className="mt-6 flex flex-col">
        <h2 className="mb-4 text-2xl font-bold">Search for a player</h2>
        <Search />
      </section>
    </main>
  );
}
