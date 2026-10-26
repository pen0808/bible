import type { Metadata } from "next";
import { BibleReader } from "@/components/bible-reader";

export const metadata: Metadata = {
  title: "The Bible",
  description: "Read and search all 66 books of the King James Version in a calm, focused reader.",
};

export default function BiblePage() {
  return <BibleReader />;
}
