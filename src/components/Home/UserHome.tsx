import { Suspense } from "react";

import CurrentMatchLink from "../CurrentMatchLink";
import OtherFeaturesSection from "../OtherFeaturesSection";
import PlayerLastMatches from "../Player/PlayerLastMatches";
import PlayerLastMatchesSkeleton from "../Player/PlayerLastMatchesSkeleton";
import Search from "../Search";

interface UserHomeProps {
  session: Session;
}

export default function UserHome({ session }: UserHomeProps) {
  return (
    <>
      <h1 className="text-3xl font-bold">Hello {session.nickname}</h1>

      <section className="my-4">
        <CurrentMatchLink player={session} yourMatch />
      </section>

      <Suspense fallback={<PlayerLastMatchesSkeleton size={1} />}>
        <PlayerLastMatches player={session} size={1} self={true} />
      </Suspense>

      {/* <section className="mt-6 flex flex-col gap-8">
        <h2 className="mb-4 text-2xl font-bold">Your Team</h2>
      </section> */}

      <section className="mt-6 flex flex-col">
        <h2 className="mb-4 text-2xl font-bold">Search for a player</h2>
        <Search />
      </section>

      <OtherFeaturesSection />
    </>
  );
}
