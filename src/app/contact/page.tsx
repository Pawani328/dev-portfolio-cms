import { readJson } from "@/lib/json-db";
import ContactClient from "./ContactClient";

interface SiteData {
  name: string;
  email: string;
  resumePath: string;
  github: string;
  linkedin: string;
  facebook: string;
}

export const metadata = {
  title: "Contact | Developer Portfolio",
};

export default function ContactPage() {
  const site = readJson<SiteData>("site.json");
  return <ContactClient site={site} />;
}
