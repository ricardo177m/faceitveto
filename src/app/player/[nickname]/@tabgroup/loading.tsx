import React from "react";

import PlayerLastMatchesSkeleton from "@/components/Player/PlayerLastMatchesSkeleton";

interface LoadingProps {
  children: React.ReactNode;
  tabgroup: React.ReactNode;
  params: Promise<{
    nickname: string;
  }>;
}
export default async function Loading(props: LoadingProps) {
  return <PlayerLastMatchesSkeleton />;
}
