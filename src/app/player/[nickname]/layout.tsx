import React, { Suspense } from "react";

import PlayerHeaderSkeleton from "@/components/Player/PlayerHeaderSkeleton";
import PlayerLayout from "@/components/Player/PlayerLayout";

interface LayoutProps {
  children: React.ReactNode;
  tabgroup: React.ReactNode;
  params: Promise<{
    nickname: string;
  }>;
}

export default async function Layout(props: LayoutProps) {
  const { children, tabgroup } = props;
  const params = await props.params;
  const { nickname } = params;

  return (
    <div className="flex flex-col gap-8">
      <Suspense fallback={<PlayerHeaderSkeleton />}>
        <PlayerLayout nickname={nickname} />
      </Suspense>
      {tabgroup}
      {children}
    </div>
  );
}
