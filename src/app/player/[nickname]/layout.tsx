export default function MatchPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto mt-2 max-w-6xl">{children}</div>;
}
