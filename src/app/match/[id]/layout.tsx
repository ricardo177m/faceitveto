import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Match - " + siteConfig.title,
  description: siteConfig.description,
};

export default function MatchPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-6xl mx-auto">{children}</div>;
}
