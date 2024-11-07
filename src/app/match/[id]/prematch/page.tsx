import { FaInfoCircle } from "react-icons/fa";
import { z } from "zod";

import Prematch from "@/components/Prematch/Prematch";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    faction: string;
  }>;
}

const schema = z.enum(["1", "2"]);

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { id } = params;
  const searchParams = await props.searchParams;

  const { faction } = searchParams;
  const parsed = schema.safeParse(faction);

  return (
    <main className="mx-auto mb-16 mt-6 max-w-6xl px-4">
      <h1 className="text-3xl font-bold">Prematch Analysis</h1>
      {!parsed.success ? (
        <p className="mt-4">Invalid faction.</p>
      ) : (
        <Prematch matchId={id} faction={parseInt(parsed.data)} />
      )}
      <hr className="mt-16 border-slate-700" />
      <div className="my-8">
        <h2 className="mb-4 inline-flex items-center gap-3 text-2xl font-bold">
          <FaInfoCircle /> Information
        </h2>
        <div className="text-justify text-gray-300">
          <p>
            Prematch Analysis works by getting the enemy team&apos;s party that
            has at least 3 players in it. It then fetches the matches where the
            core (at least 3 players from the party) played together in the map
            of the current match. For example: if there is a party with 4
            players, it will fetch matches where any 3 of those 4 players played
            together.
          </p>
          <p>
            The demos of the latest 2 matches are then downloaded and parsed.
            Currently, it only shows the pistol round bombsite and utility used.
          </p>
        </div>
      </div>
    </main>
  );
}
