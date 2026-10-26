import type { Metadata } from "next";
import { MeditationExperience } from "@/components/meditation-experience";

export const metadata: Metadata = {
  title: "Meditate",
  description: "A guided, breathing meditation experience rooted in Scripture.",
};

export default function MeditatePage() {
  return <MeditationExperience />;
}
