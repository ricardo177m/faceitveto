import PlayerHeader from "@/components/PlayerHeader";
import FaceitIcon from "@/components/faceit";
import { fetchPlayerByNickname } from "@/lib/player";

interface PlayerPageProps {
  params: {
    nickname: string;
  };
}

async function PlayerPage({ params: { nickname } }: PlayerPageProps) {
  const player = await fetchPlayerByNickname(nickname);

  if (!player) {
    return (
      <div className="px-4 flex flex-col justify-center gap-8 mb-16">
        <h1 className="text-2xl font-bold text-center text-white">
          Player not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="px-4 flex flex-col gap-8 mb-16">
      <PlayerHeader player={player} />
      <div className="bg-primary inline-flex items-center gap-4 py-4 px-6 rounded-lg cursor-pointer">
        <FaceitIcon className="w-6" />
        <h1 className="font-bold">Playing right now!</h1>
      </div>
      <section>
        <h1>Some cool stats</h1>
      </section>
      <section>
        <h1>Teammates</h1>
      </section>
      <section>
        <h1>Last matches</h1>
      </section>
    </div>
  );
}

export default PlayerPage;
