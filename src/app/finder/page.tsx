import { config } from "@/config/config";
import Finder from "@/components/Finder";

export default function FinderPage() {
  return (
    <main className="mx-auto mb-16 mt-6 max-w-6xl px-4">
      <h1 className="text-3xl font-bold">Find FACEIT Account</h1>
      <Finder className="mt-6" />
    </main>
  );
}

export const metadata = {
  title: `FACEIT Finder - ${config.title}`,
  description: `Find the FACEIT account linked to a Steam profile on ${config.title}.`,
  keywords:
    "faceit, finder, account, player, stats, matches, veto, faceit veto",
};
