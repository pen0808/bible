export type Testament = "Old" | "New";

export type BibleBookMeta = {
  name: string;
  slug: string;
  chapters: number;
  testament: Testament;
  group: string;
};

export const bibleBooks: BibleBookMeta[] = [
  { name: "Genesis", slug: "genesis", chapters: 50, testament: "Old", group: "Law" },
  { name: "Exodus", slug: "exodus", chapters: 40, testament: "Old", group: "Law" },
  { name: "Leviticus", slug: "leviticus", chapters: 27, testament: "Old", group: "Law" },
  { name: "Numbers", slug: "numbers", chapters: 36, testament: "Old", group: "Law" },
  { name: "Deuteronomy", slug: "deuteronomy", chapters: 34, testament: "Old", group: "Law" },
  { name: "Joshua", slug: "joshua", chapters: 24, testament: "Old", group: "History" },
  { name: "Judges", slug: "judges", chapters: 21, testament: "Old", group: "History" },
  { name: "Ruth", slug: "ruth", chapters: 4, testament: "Old", group: "History" },
  { name: "1 Samuel", slug: "1-samuel", chapters: 31, testament: "Old", group: "History" },
  { name: "2 Samuel", slug: "2-samuel", chapters: 24, testament: "Old", group: "History" },
  { name: "1 Kings", slug: "1-kings", chapters: 22, testament: "Old", group: "History" },
  { name: "2 Kings", slug: "2-kings", chapters: 25, testament: "Old", group: "History" },
  { name: "1 Chronicles", slug: "1-chronicles", chapters: 29, testament: "Old", group: "History" },
  { name: "2 Chronicles", slug: "2-chronicles", chapters: 36, testament: "Old", group: "History" },
  { name: "Ezra", slug: "ezra", chapters: 10, testament: "Old", group: "History" },
  { name: "Nehemiah", slug: "nehemiah", chapters: 13, testament: "Old", group: "History" },
  { name: "Esther", slug: "esther", chapters: 10, testament: "Old", group: "History" },
  { name: "Job", slug: "job", chapters: 42, testament: "Old", group: "Poetry" },
  { name: "Psalms", slug: "psalms", chapters: 150, testament: "Old", group: "Poetry" },
  { name: "Proverbs", slug: "proverbs", chapters: 31, testament: "Old", group: "Poetry" },
  { name: "Ecclesiastes", slug: "ecclesiastes", chapters: 12, testament: "Old", group: "Poetry" },
  { name: "Song of Solomon", slug: "song-of-solomon", chapters: 8, testament: "Old", group: "Poetry" },
  { name: "Isaiah", slug: "isaiah", chapters: 66, testament: "Old", group: "Major Prophets" },
  { name: "Jeremiah", slug: "jeremiah", chapters: 52, testament: "Old", group: "Major Prophets" },
  { name: "Lamentations", slug: "lamentations", chapters: 5, testament: "Old", group: "Major Prophets" },
  { name: "Ezekiel", slug: "ezekiel", chapters: 48, testament: "Old", group: "Major Prophets" },
  { name: "Daniel", slug: "daniel", chapters: 12, testament: "Old", group: "Major Prophets" },
  { name: "Hosea", slug: "hosea", chapters: 14, testament: "Old", group: "Minor Prophets" },
  { name: "Joel", slug: "joel", chapters: 3, testament: "Old", group: "Minor Prophets" },
  { name: "Amos", slug: "amos", chapters: 9, testament: "Old", group: "Minor Prophets" },
  { name: "Obadiah", slug: "obadiah", chapters: 1, testament: "Old", group: "Minor Prophets" },
  { name: "Jonah", slug: "jonah", chapters: 4, testament: "Old", group: "Minor Prophets" },
  { name: "Micah", slug: "micah", chapters: 7, testament: "Old", group: "Minor Prophets" },
  { name: "Nahum", slug: "nahum", chapters: 3, testament: "Old", group: "Minor Prophets" },
  { name: "Habakkuk", slug: "habakkuk", chapters: 3, testament: "Old", group: "Minor Prophets" },
  { name: "Zephaniah", slug: "zephaniah", chapters: 3, testament: "Old", group: "Minor Prophets" },
  { name: "Haggai", slug: "haggai", chapters: 2, testament: "Old", group: "Minor Prophets" },
  { name: "Zechariah", slug: "zechariah", chapters: 14, testament: "Old", group: "Minor Prophets" },
  { name: "Malachi", slug: "malachi", chapters: 4, testament: "Old", group: "Minor Prophets" },
  { name: "Matthew", slug: "matthew", chapters: 28, testament: "New", group: "Gospels" },
  { name: "Mark", slug: "mark", chapters: 16, testament: "New", group: "Gospels" },
  { name: "Luke", slug: "luke", chapters: 24, testament: "New", group: "Gospels" },
  { name: "John", slug: "john", chapters: 21, testament: "New", group: "Gospels" },
  { name: "Acts", slug: "acts", chapters: 28, testament: "New", group: "History" },
  { name: "Romans", slug: "romans", chapters: 16, testament: "New", group: "Pauline Epistles" },
  { name: "1 Corinthians", slug: "1-corinthians", chapters: 16, testament: "New", group: "Pauline Epistles" },
  { name: "2 Corinthians", slug: "2-corinthians", chapters: 13, testament: "New", group: "Pauline Epistles" },
  { name: "Galatians", slug: "galatians", chapters: 6, testament: "New", group: "Pauline Epistles" },
  { name: "Ephesians", slug: "ephesians", chapters: 6, testament: "New", group: "Pauline Epistles" },
  { name: "Philippians", slug: "philippians", chapters: 4, testament: "New", group: "Pauline Epistles" },
  { name: "Colossians", slug: "colossians", chapters: 4, testament: "New", group: "Pauline Epistles" },
  { name: "1 Thessalonians", slug: "1-thessalonians", chapters: 5, testament: "New", group: "Pauline Epistles" },
  { name: "2 Thessalonians", slug: "2-thessalonians", chapters: 3, testament: "New", group: "Pauline Epistles" },
  { name: "1 Timothy", slug: "1-timothy", chapters: 6, testament: "New", group: "Pauline Epistles" },
  { name: "2 Timothy", slug: "2-timothy", chapters: 4, testament: "New", group: "Pauline Epistles" },
  { name: "Titus", slug: "titus", chapters: 3, testament: "New", group: "Pauline Epistles" },
  { name: "Philemon", slug: "philemon", chapters: 1, testament: "New", group: "Pauline Epistles" },
  { name: "Hebrews", slug: "hebrews", chapters: 13, testament: "New", group: "General Epistles" },
  { name: "James", slug: "james", chapters: 5, testament: "New", group: "General Epistles" },
  { name: "1 Peter", slug: "1-peter", chapters: 5, testament: "New", group: "General Epistles" },
  { name: "2 Peter", slug: "2-peter", chapters: 3, testament: "New", group: "General Epistles" },
  { name: "1 John", slug: "1-john", chapters: 5, testament: "New", group: "General Epistles" },
  { name: "2 John", slug: "2-john", chapters: 1, testament: "New", group: "General Epistles" },
  { name: "3 John", slug: "3-john", chapters: 1, testament: "New", group: "General Epistles" },
  { name: "Jude", slug: "jude", chapters: 1, testament: "New", group: "General Epistles" },
  { name: "Revelation", slug: "revelation", chapters: 22, testament: "New", group: "Prophecy" },
];

export function getBookBySlug(slug: string) {
  return bibleBooks.find((book) => book.slug === slug);
}

export function getBookByName(name: string) {
  return bibleBooks.find((book) => book.name === name);
}

export function getBibleReference(slug: string, chapter: number) {
  const book = getBookBySlug(slug);
  return book ? `${book.name} ${chapter}` : "";
}

export const oldTestamentBooks = bibleBooks.filter((book) => book.testament === "Old");
export const newTestamentBooks = bibleBooks.filter((book) => book.testament === "New");
