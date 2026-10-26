import type { Metadata } from "next";
import { PlansExperience } from "@/components/plans-experience";

export const metadata: Metadata = {
  title: "Reading Plans",
  description: "Gentle, Scripture-centered reading plans to help you grow a little every day.",
};

export default function PlansPage() {
  return <PlansExperience />;
}
