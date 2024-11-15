import { config } from "@/config/config";
import Premade from "@/components/Team/Premade";

export default function PremadePage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Premade Win Rate</h1>
      <Premade className="mt-6" />
    </>
  );
}

export const metadata = {
  title: `Premade Win Rate - ${config.title}`,
  description: `Discover the win rate of your premade team on ${config.title}.`,
  keywords:
    "faceit, premade, team, win rate, stats, matches, veto, faceit veto",
};
