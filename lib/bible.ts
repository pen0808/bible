import { bibleBooks, getBookBySlug, type BibleBookMeta } from "@/data/books";

export type BibleBook = {
  name: string;
  abbrev: string;
  chapters: string[][];
};

export type BibleSearchHit = {
  id: string;
  bookName: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  text: string;
};

const bibleCache = new Map<string, Promise<BibleBook[]>>();
const searchIndexCache = new Map<string, BibleSearchHit[]>();

const versionFiles: Record<string, string> = {
  kjv: "/scripture/kjv.json",
  web: "/scripture/web.json",
  asv: "/scripture/asv.json",
  bsb: "/scripture/bsb.json",
  gnb: "/scripture/web.json",
};

export async function loadBible(version = "kjv"): Promise<BibleBook[]> {
  const cached = bibleCache.get(version);
  if (cached) return cached;

  const url = versionFiles[version] ?? "/scripture/kjv.json";
  const promise = fetch(url, { cache: "force-cache" })
    .then((response) => {
      if (!response.ok) throw new Error("Unable to load Scripture.");
      return response.json() as Promise<BibleBook[]>;
    })
    .catch((error) => {
      bibleCache.delete(version);
      throw error;
    });

  bibleCache.set(version, promise);
  return promise;
}

export function clearBibleCache(version?: string) {
  if (version) {
    bibleCache.delete(version);
    searchIndexCache.delete(version);
    return;
  }
  bibleCache.clear();
  searchIndexCache.clear();
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function searchBible(data: BibleBook[], query: string, limit = 60, version = "kjv"): BibleSearchHit[] {
  const needle = normalize(query);
  if (needle.length < 3) return [];

  let index = searchIndexCache.get(version);
  if (!index) {
    index = [];
    for (const book of data) {
      const meta = bibleBooks.find((item) => item.name === book.name);
      if (!meta) continue;
      book.chapters.forEach((chapter, chapterIndex) => {
        chapter.forEach((text, verseIndex) => {
          index!.push({
            id: `${version}-${meta.slug}-${chapterIndex + 1}-${verseIndex + 1}`,
            bookName: book.name,
            bookSlug: meta.slug,
            chapter: chapterIndex + 1,
            verse: verseIndex + 1,
            text,
          });
        });
      });
    }
    searchIndexCache.set(version, index);
  }

  const results: BibleSearchHit[] = [];
  for (const hit of index) {
    if (normalize(hit.text).includes(needle)) {
      results.push(hit);
      if (results.length >= limit) break;
    }
  }
  return results;
}

export function getBookData(data: BibleBook[], slug: string) {
  const meta = getBookBySlug(slug);
  if (!meta) return null;
  const book = data.find((item) => item.name === meta.name);
  return book ? { meta, book } : null;
}

export function getAdjacentChapter(
  meta: BibleBookMeta,
  chapter: number,
  direction: -1 | 1,
): { meta: BibleBookMeta; chapter: number } | null {
  if (direction === 1) {
    if (chapter < meta.chapters) return { meta, chapter: chapter + 1 };
    const index = bibleBooks.findIndex((book) => book.slug === meta.slug);
    const next = bibleBooks[index + 1];
    return next ? { meta: next, chapter: 1 } : null;
  }

  if (chapter > 1) return { meta, chapter: chapter - 1 };
  const index = bibleBooks.findIndex((book) => book.slug === meta.slug);
  const previous = bibleBooks[index - 1];
  return previous ? { meta: previous, chapter: previous.chapters } : null;
}

export function buildReaderHash(slug: string, chapter: number, verse?: number) {
  return `${slug}:${chapter}${verse ? `:${verse}` : ""}`;
}

export function parseReaderHash(hash: string) {
  const clean = hash.replace(/^#/, "");
  if (clean === "search") return { search: true as const };
  const [slug, chapterValue, verseValue] = clean.split(":");
  if (!slug || !chapterValue) return null;
  const chapter = Number.parseInt(chapterValue, 10);
  if (!Number.isFinite(chapter) || chapter < 1) return null;
  return {
    slug,
    chapter,
    verse: verseValue ? Number.parseInt(verseValue, 10) : undefined,
    search: false as const,
  };
}

export function readingTimeForChapter(verses: string[]) {
  const words = verses.reduce((total, verse) => total + verse.split(" ").length, 0);
  return Math.max(1, Math.round(words / 200));
}
