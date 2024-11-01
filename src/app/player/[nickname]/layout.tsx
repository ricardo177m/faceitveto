import { Suspense } from "react";

import PlayerHeaderSkeleton from "@/components/Player/PlayerHeaderSkeleton";
import PlayerLayout from "@/components/Player/PlayerLayout";

interface PlayerPageProps {
  params: Promise<{
    nickname: string;
  }>;
  children: React.ReactNode;
}

export default async function PlayerPageLayout(props: PlayerPageProps) {
  const params = await props.params;
  const { nickname } = params;
  const { children } = props;

  return (
    <div className="mx-auto mt-2 max-w-6xl">
      <div className="mb-16 flex flex-col gap-8 px-4">
        {/* <Suspense fallback={<PlayerHeaderSkeleton />}> */}
        <PlayerLayout nickname={nickname}>{children}</PlayerLayout>
        {/* </Suspense> */}
      </div>
    </div>
  );
}
