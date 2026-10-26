import { getBookByName, getBookBySlug } from "@/data/books";

export type ParsedReference = {
  bookName: string;
  bookSlug: string;
  chapter: number;
  verse: number;
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/^psalm$/, "psalms")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parseScriptureReference(reference: string): ParsedReference | null {
  const match = reference.match(/^(.+?)\s+(\d+):(\d+)/);
  if (!match) return null;

  const rawBook = match[1].trim();
  const normalizedBook = rawBook === "Psalm" ? "Psalms" : rawBook;
  const book = getBookByName(normalizedBook) ?? getBookBySlug(slugify(normalizedBook));
  const chapter = Number.parseInt(match[2], 10);
  const verse = Number.parseInt(match[3], 10);

  if (!book || !Number.isFinite(chapter) || !Number.isFinite(verse)) return null;

  return {
    bookName: book.name,
    bookSlug: book.slug,
    chapter,
    verse,
  };
}
