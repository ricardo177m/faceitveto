import { z } from "zod";

import Prematch from "@/components/Prematch/Prematch";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    faction: string;
  }>;
}

const schema = z.enum(["1", "2"]);

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { id } = params;
  const searchParams = await props.searchParams;

  const { faction } = searchParams;
  const parsed = schema.safeParse(faction);

  if (!parsed.success) return <p>Invalid faction.</p>;
  return <Prematch matchId={id} faction={parseInt(parsed.data)} />;
}
