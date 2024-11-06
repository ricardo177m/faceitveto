import Radar from "@/components/Radar/Radar";

export default function Page() {
  const map = "de_mirage";

  return (
    <main className="mx-auto mb-16 mt-6 max-w-6xl px-4">
      <h1 className="text-3xl font-bold">Analysis</h1>
      <Radar map={map} />
    </main>
  );
}
