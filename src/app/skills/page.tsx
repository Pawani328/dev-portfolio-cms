import { readJson } from "@/lib/json-db";
import SkillsClient from "./SkillsClient";

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface SkillsData {
  categories: SkillCategory[];
}

export const metadata = {
  title: "Skills | Developer Portfolio",
};

export default function SkillsPage() {
  const data = readJson<SkillsData>("skills.json");
  return <SkillsClient categories={data.categories} />;
}
