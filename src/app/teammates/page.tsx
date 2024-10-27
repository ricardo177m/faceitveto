import { config } from "@/config/config";
import Teammates from "@/components/Teammates";

export default function FinderPage() {
  return (
    <main className="mx-auto mb-16 mt-6 max-w-6xl px-4">
      <h1 className="text-3xl font-bold">Teammates</h1>
      <Teammates className="mt-6" />
    </main>
  );
}
export const metadata = {
  title: `Teammates - ${config.title}`,
  description: `View your teammates' stats and matches on ${config.title}.`,
  keywords: "faceit, teammates, team, stats, matches, veto, faceit veto",
};
