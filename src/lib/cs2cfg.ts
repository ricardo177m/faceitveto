import { faceit } from "@/config/endpoints";

export async function fetchSkillGroups(): Promise<SkillGroupMapping[]> {
  const response = await fetch(faceit.skillGroups, {
    cache: "force-cache",
  });
  const data = await response.json();
  if (response.status === 200) return data.payload.level_mappings;
  else throw new Error(data.errors[0].message);
}
