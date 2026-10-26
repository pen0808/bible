import type { Metadata } from "next";
import { DevotionsLibrary } from "@/components/devotions-library";

export const metadata: Metadata = {
  title: "Daily Devotions",
  description: "A collection of quiet, Scripture-centered devotions for everyday life.",
};

export default function DevotionsPage() {
  return <DevotionsLibrary />;
}
