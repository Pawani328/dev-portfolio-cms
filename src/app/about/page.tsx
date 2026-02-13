import { readJson } from "@/lib/json-db";
import AboutClient from "./AboutClient";

interface AboutData {
  headline: string;
  intro: string;
  sections: { title: string; content: string }[];
  timeline: { year: string; title: string; description: string }[];
}

export const metadata = {
  title: "About | Developer Portfolio",
};

export default function AboutPage() {
  const data = readJson<AboutData>("about.json");
  return <AboutClient data={data} />;
}
