import { config } from "@/config/config";
import HaveWeMet from "@/components/Together/HaveWeMet";

export default function HaveWeMetPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Have We Met</h1>
      <HaveWeMet className="mt-6" />
    </>
  );
}

export const metadata = {
  title: `Have We Met - ${config.title}`,
  description: `Find out if you have played with or against another player on ${config.title}.`,
  keywords:
    "faceit, together, account, player, stats, matches, have we met, veto, faceit veto",
};
