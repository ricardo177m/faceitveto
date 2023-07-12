import { config } from "@/config/config";

export const metadata = {
  title: "Match - " + config.title,
  description: config.description,
};

export default function MatchPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-6xl">{children}</div>;
}
