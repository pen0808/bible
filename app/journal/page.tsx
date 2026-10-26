import type { Metadata } from "next";
import { JournalExperience } from "@/components/journal-experience";

export const metadata: Metadata = {
  title: "Journal",
  description: "Keep the verses and reflections that speak to your soul.",
};

export default function JournalPage() {
  return <JournalExperience />;
}
