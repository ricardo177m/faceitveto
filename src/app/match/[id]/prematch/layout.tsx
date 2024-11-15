import { FaInfoCircle } from "react-icons/fa";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <h1 className="text-3xl font-bold">Prematch Analysis</h1>
      <section className="my-4">{children}</section>
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
    </>
  );
}
