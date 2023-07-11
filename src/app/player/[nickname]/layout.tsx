export default function MatchPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-6xl mx-auto mt-2">{children}</div>;
}
