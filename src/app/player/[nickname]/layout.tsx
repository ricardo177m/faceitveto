import { Metadata } from "next";

import { siteConfig } from "@/config/site";

interface PlayerPageProps {
  children: React.ReactNode;
  params: {
    nickname: string;
  };
}

export default function MatchPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-6xl mx-auto mt-2">{children}</div>;
}

export function generateMetadata({
  params: { nickname },
}: PlayerPageProps): Metadata {
  return {
    title: nickname + " - " + siteConfig.title,
    description: siteConfig.description,
  };
}
