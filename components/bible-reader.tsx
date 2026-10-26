"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BookPicker } from "@/components/book-picker";
import { Icon } from "@/components/icons";
import { ListenButton } from "@/components/listen-button";
import { SaveVerseButton } from "@/components/save-verse-button";
import { bibleBooks, getBookBySlug } from "@/data/books";
import { bibleVersions, getBibleVersionById } from "@/data/bible-versions";
import {
  getAdjacentChapter,
  getBookData,
  loadBible,
  parseReaderHash,
  readingTimeForChapter,
  searchBible,
  type BibleBook,
  type BibleSearchHit,
} from "@/lib/bible";
import {
  getLastRead,
  saveBibleVersion,
  saveLastRead,
  saveReaderFont,
  useBibleVersion,
  useReaderFont,
} from "@/lib/storage";
import { showToast } from "@/lib/toast";

const fallbackSlug = "psalms";
const fallbackChapter = 23;

export function BibleReader() {
  const [data, setData] = useState<BibleBook[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState(fallbackSlug);
  const [chapter, setChapter] = useState(fallbackChapter);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [retry, setRetry] = useState(0);
  const [fontSize] = useReaderFont();
  const [version] = useBibleVersion();
  const readerRef = useRef<HTMLDivElement>(null);
  const activeVersion = getBibleVersionById(version);
  const isKjv = activeVersion.id === "kjv";

  useEffect(() => {
    let active = true;

    loadBible(version)
      .then((books) => {
        if (active) {
          setError(null);
          setData(books);
        }
      })
      .catch(() => {
        if (active) setError("Scripture could not be loaded. Please check your connection and try again.");
      });

    return () => {
      active = false;
    };
  }, [retry, version]);

  useEffect(() => {
    const applyReference = () => {
      const parsed = parseReaderHash(window.location.hash);
      if (parsed?.search) {
        setSearchOpen(true);
        return;
      }

      if (parsed) {
        const meta = getBookBySlug(parsed.slug);
        if (meta && parsed.chapter <= meta.chapters) {
          setSlug(meta.slug);
          setChapter(parsed.chapter);
          setSelectedVerse(parsed.verse ?? null);
          saveLastRead(meta.slug, parsed.chapter);
          return;
        }
      }

      const lastRead = getLastRead();
      if (lastRead && getBookBySlug(lastRead.slug)) {
        setSlug(lastRead.slug);
        setChapter(lastRead.chapter);
      }
    };

    applyReference();
    window.addEventListener("hashchange", applyReference);
    return () => window.removeEventListener("hashchange", applyReference);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSearchOpen(false);
      setPickerOpen(false);
      setSelectedVerse(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!searchOpen && !pickerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [searchOpen, pickerOpen]);

  const meta = getBookBySlug(slug) ?? bibleBooks.find((book) => book.slug === fallbackSlug)!;
  const bookData = data ? getBookData(data, meta.slug) : null;
  const verses = bookData?.book.chapters[chapter - 1] ?? [];
  const selectedText = selectedVerse ? verses[selectedVerse - 1] : null;
  const readTime = readingTimeForChapter(verses);
  const previous = getAdjacentChapter(meta, chapter, -1);
  const next = getAdjacentChapter(meta, chapter, 1);
  const textSizeClass = fontSize >= 1.3 ? "size-xl" : fontSize >= 1.14 ? "size-lg" : "";

  const results = useMemo(() => {
    if (!data || query.trim().length < 3) return [];
    return searchBible(data, query, 60, version);
  }, [data, query, version]);

  const goTo = (nextSlug: string, nextChapter: number, verse?: number) => {
    const nextMeta = getBookBySlug(nextSlug);
    if (!nextMeta) return;
    const safeChapter = Math.min(Math.max(1, nextChapter), nextMeta.chapters);
    setSlug(nextMeta.slug);
    setChapter(safeChapter);
    setSelectedVerse(verse ?? null);
    saveLastRead(nextMeta.slug, safeChapter);
    window.history.replaceState(null, "", `#${nextMeta.slug}:${safeChapter}${verse ? `:${verse}` : ""}`);
    setPickerOpen(false);
    window.setTimeout(() => {
      if (verse) {
        document.getElementById(`verse-${verse}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        readerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const openSearchResult = (hit: BibleSearchHit) => {
    setSearchOpen(false);
    setQuery("");
    goTo(hit.bookSlug, hit.chapter, hit.verse);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
    window.history.replaceState(null, "", `#${slug}:${chapter}${selectedVerse ? `:${selectedVerse}` : ""}`);
  };

  const copyVerse = async () => {
    if (!selectedText || !selectedVerse) return;
    const reference = `${meta.name} ${chapter}:${selectedVerse}`;
    try {
      await navigator.clipboard.writeText(`“${selectedText}” — ${reference} (${activeVersion.code})`);
      showToast("Verse copied to your clipboard.", "gold");
    } catch {
      showToast("Unable to copy this verse.");
    }
  };

  const shareVerse = async () => {
    if (!selectedText || !selectedVerse) return;
    const reference = `${meta.name} ${chapter}:${selectedVerse}`;
    const text = `“${selectedText}” — ${reference} (${activeVersion.code})`;
    if (navigator.share) {
      try {
        await navigator.share({ title: reference, text });
        return;
      } catch {
        // The user may cancel the native share sheet.
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast("Verse copied—ready to share.", "gold");
    } catch {
      showToast("Sharing is not available in this browser.");
    }
  };

  const selectedReference = selectedVerse ? `${meta.name} ${chapter}:${selectedVerse}` : "";

  return (
    <div className="page-enter" ref={readerRef}>
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-gold">Scripture</p>
          <h1 className="mt-3 font-display text-[2.7rem] font-medium leading-none text-ink sm:text-[3.5rem]">
            The Bible, <span className="italic text-pine">quietly open.</span>
          </h1>
          <p className="mt-3 max-w-xl text-[0.86rem] leading-6 text-ink-soft">
            All 66 books across multiple translations. Choose the version that speaks best to your heart and read at your pace.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPickerOpen(true)} className="btn-ghost">
            <Icon name="grid" size={14} />
            Browse books
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="btn-primary"
            disabled={!data}
          >
            <Icon name="search" size={14} />
            Search
          </button>
        </div>
      </header>

      <div className="mt-6 grid gap-5 xl:grid-cols-[242px_minmax(0,1fr)]">
        <aside className="hidden xl:block">
          <div className="sticky top-8 rounded-[1.65rem] border border-line bg-surface/70 p-4 shadow-[var(--shadow-card)] backdrop-blur-sm">
            <BookPicker currentSlug={meta.slug} onSelect={goTo} />
          </div>
        </aside>

        <section className="min-w-0">
          <div className="card flex flex-wrap items-center gap-2 p-2.5 sm:p-3">
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="icon-btn !h-10 !w-10 xl:hidden"
              aria-label="Browse books"
            >
              <Icon name="menu" size={17} />
            </button>

            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              <label htmlFor="version-select" className="sr-only">
                Bible version
              </label>
              <select
                id="version-select"
                value={version}
                onChange={(event) => {
                  const next = event.target.value;
                  saveBibleVersion(next);
                  setData(null);
                  setError(null);
                  setRetry((value) => value + 1);
                  showToast(`Reading ${getBibleVersionById(next).shortName}.`, "gold");
                }}
                className="rounded-full border border-line bg-surface-muted/70 py-2 pl-3 pr-7 text-[0.66rem] font-semibold text-ink outline-none"
              >
                {bibleVersions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.shortName}
                  </option>
                ))}
              </select>

              <span className="hidden h-5 w-px bg-line sm:block" />

              <label htmlFor="book-select" className="sr-only">
                Book
              </label>
              <select
                id="book-select"
                value={meta.slug}
                onChange={(event) => goTo(event.target.value, 1)}
                className="max-w-[8.5rem] truncate rounded-full border border-line bg-surface-muted/70 py-2 pl-3 pr-7 text-[0.68rem] font-semibold text-ink outline-none sm:max-w-[11rem]"
              >
                {bibleBooks.map((book) => (
                  <option key={book.slug} value={book.slug}>
                    {book.name}
                  </option>
                ))}
              </select>

              <label htmlFor="chapter-select" className="sr-only">
                Chapter
              </label>
              <select
                id="chapter-select"
                value={chapter}
                onChange={(event) => goTo(meta.slug, Number.parseInt(event.target.value, 10))}
                className="rounded-full border border-line bg-surface-muted/70 py-2 pl-3 pr-7 text-[0.68rem] font-semibold text-ink outline-none"
              >
                {Array.from({ length: meta.chapters }, (_, index) => index + 1).map((number) => (
                  <option key={number} value={number}>
                    Chapter {number}
                  </option>
                ))}
              </select>
            </div>

            <span className="mx-1 hidden h-5 w-px bg-line sm:block" />

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => previous && goTo(previous.meta.slug, previous.chapter)}
                disabled={!previous}
                className="icon-btn !h-9 !w-9 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Previous chapter"
              >
                <Icon name="chevron-left" size={16} />
              </button>
              <button
                type="button"
                onClick={() => next && goTo(next.meta.slug, next.chapter)}
                disabled={!next}
                className="icon-btn !h-9 !w-9 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Next chapter"
              >
                <Icon name="chevron-right" size={16} />
              </button>
            </div>

            <div className="ml-auto flex items-center gap-1">
              <div className="hidden items-center gap-1 rounded-full border border-line bg-surface-muted/50 p-1 sm:flex">
                <button
                  type="button"
                  onClick={() => saveReaderFont(Math.max(1, Number((fontSize - 0.15).toFixed(2))))}
                  disabled={fontSize <= 1}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[0.64rem] font-bold text-ink-soft transition hover:bg-surface disabled:opacity-30"
                  aria-label="Decrease text size"
                >
                  A−
                </button>
                <button
                  type="button"
                  onClick={() => saveReaderFont(Math.min(1.3, Number((fontSize + 0.15).toFixed(2))))}
                  disabled={fontSize >= 1.3}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[0.82rem] font-bold text-ink-soft transition hover:bg-surface disabled:opacity-30"
                  aria-label="Increase text size"
                >
                  A+
                </button>
              </div>
              {data && verses.length > 0 && (
                <ListenButton
                  text={`${meta.name} chapter ${chapter}. ${verses
                    .map((verse, index) => `Verse ${index + 1}. ${verse}`)
                    .join(" ")}`}
                  variant="icon"
                  className="!h-9 !w-9"
                />
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                disabled={!data}
                className="icon-btn !h-9 !w-9 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Search Scripture"
              >
                <Icon name="search" size={16} />
              </button>
            </div>
          </div>

          {error ? (
            <div className="card mt-4 flex flex-col items-center justify-center px-6 py-24 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold">
                <Icon name="refresh" size={20} />
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink">The pages did not load</h2>
              <p className="mt-2 max-w-sm text-[0.8rem] leading-6 text-ink-soft">{error}</p>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setRetry((value) => value + 1);
                }}
                className="btn-primary mt-5"
              >
                Try again
              </button>
            </div>
          ) : (
            <article className="mt-4 overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[var(--shadow-card)]">
              <div className="relative border-b border-line px-5 py-8 sm:px-10 sm:py-10 lg:px-14">
                <div className="soft-grid pointer-events-none absolute inset-0 opacity-30" />
                <div className="relative flex items-start justify-between gap-6">
                  <div>
                    <p className="eyebrow text-gold">
                      {meta.testament} Testament · {meta.group}
                    </p>
                    <h2 className="mt-3 font-display text-[2.6rem] font-medium leading-none text-ink sm:text-[3.4rem]">
                      {meta.name} <span className="text-gold">{chapter}</span>
                    </h2>
                    <p className="mt-3 text-[0.7rem] font-medium text-ink-faint">
                      Chapter {chapter} of {meta.chapters} · {activeVersion.name} ({activeVersion.code})
                      {!isKjv && " · Translation provided for reference"}
                    </p>
                  </div>
                  <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold-soft/30 font-display text-2xl font-semibold text-gold sm:flex">
                    {chapter}
                  </div>
                </div>
              </div>

              <div className="px-5 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
                {!data ? (
                  <div className="space-y-4">
                    {[96, 100, 88, 94, 80, 100, 92, 70].map((width, index) => (
                      <div
                        key={index}
                        className="skeleton h-4 rounded-full"
                        style={{ width: `${width}%` }}
                      />
                    ))}
                    <p className="pt-4 text-center text-[0.68rem] font-medium text-ink-faint">
                      Preparing the pages…
                    </p>
                  </div>
                ) : (
                  <>
                    <div className={`reader-text ${textSizeClass}`}>
                      {verses.map((verse, index) => {
                        const verseNumber = index + 1;
                        return (
                          <button
                            key={verseNumber}
                            id={`verse-${verseNumber}`}
                            type="button"
                            onClick={() =>
                              setSelectedVerse((current) => (current === verseNumber ? null : verseNumber))
                            }
                            className={`verse ${selectedVerse === verseNumber ? "selected" : ""}`}
                            aria-label={`Select ${meta.name} ${chapter}:${verseNumber}`}
                          >
                            <sup>{verseNumber}</sup>
                            {verse}{" "}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                      <p className="text-[0.62rem] font-medium text-ink-faint">
                        {verses.length} verse{verses.length === 1 ? "" : "s"} · about {readTime} min read
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="chip">
                          <Icon name="bookmark" size={10} />
                          Tap a verse to keep it
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </article>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[previous, next].map((item, index) => {
              if (!item) return <div key={index} />;
              return (
                <button
                  key={item.meta.slug + item.chapter}
                  type="button"
                  onClick={() => goTo(item.meta.slug, item.chapter)}
                  className={`card group flex items-center gap-3 p-4 text-left transition hover:border-line-strong ${
                    index === 1 ? "justify-end text-right" : ""
                  }`}
                >
                  {index === 0 && (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-ink-faint transition group-hover:text-pine">
                      <Icon name="arrow-left" size={15} />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block text-[0.53rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
                      {index === 0 ? "Previous" : "Next"}
                    </span>
                    <span className="mt-1 block truncate font-display text-[1.1rem] font-semibold text-ink">
                      {item.meta.name} {item.chapter}
                    </span>
                  </span>
                  {index === 1 && (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-ink-faint transition group-hover:text-pine">
                      <Icon name="arrow-right" size={15} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {selectedText && (
        <div className="fixed inset-x-0 bottom-[calc(4.8rem+env(safe-area-inset-bottom))] z-[60] px-3 lg:bottom-6 lg:left-[274px]">
          <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-2xl border border-white/10 bg-pine p-2 pl-3 text-[#f7f1e4] shadow-[0_20px_60px_-20px_rgba(13,42,32,0.8)]">
            <div className="min-w-0 flex-1">
              <p className="text-[0.55rem] font-bold uppercase tracking-[0.14em] text-gold">{selectedReference}</p>
              <p className="mt-0.5 truncate text-[0.68rem] text-[#c5d4c7]">{selectedText}</p>
            </div>
            <SaveVerseButton
              reference={selectedReference}
              text={selectedText}
              variant="hero"
              label={false}
              className="!h-9 !w-9 !px-0"
            />
            <button
              type="button"
              onClick={copyVerse}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[#dbe4dd] transition hover:bg-white/[0.12] hover:text-white"
              aria-label="Copy verse"
            >
              <Icon name="copy" size={15} />
            </button>
            <button
              type="button"
              onClick={shareVerse}
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[#dbe4dd] transition hover:bg-white/[0.12] hover:text-white sm:flex"
              aria-label="Share verse"
            >
              <Icon name="share" size={15} />
            </button>
            <button
              type="button"
              onClick={() => setSelectedVerse(null)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#a9bbae] transition hover:bg-white/[0.06] hover:text-white"
              aria-label="Close verse actions"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center bg-[#0d1713]/45 px-3 pt-16 backdrop-blur-md sm:pt-24">
          <button type="button" className="absolute inset-0 cursor-default" onClick={closeSearch} aria-label="Close search" />
          <div className="relative flex max-h-[72vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5 sm:px-5">
              <Icon name="search" size={19} className="text-gold" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a word, phrase, or name…"
                className="min-w-0 flex-1 bg-transparent text-[0.88rem] text-ink outline-none placeholder:text-ink-faint"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-[0.62rem] font-semibold text-ink-faint transition hover:text-ink"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={closeSearch}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-ink-soft transition hover:text-ink"
                aria-label="Close search"
              >
                <Icon name="close" size={15} />
              </button>
            </div>

            <div className="overflow-y-auto p-2 thin-scroll">
              {!data ? (
                <div className="px-4 py-12 text-center text-[0.76rem] text-ink-faint">Preparing Scripture…</div>
              ) : query.trim().length < 3 ? (
                <div className="px-5 py-12 text-center">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft text-gold">
                    <Icon name="sparkle" size={18} />
                  </span>
                  <p className="mt-3 font-display text-xl font-semibold text-ink">Search the whole Bible</p>
                  <p className="mx-auto mt-1.5 max-w-xs text-[0.72rem] leading-5 text-ink-soft">
                    Enter at least three letters to find a word or phrase across all 66 books.
                  </p>
                </div>
              ) : results.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <p className="font-display text-xl font-semibold text-ink">No passages found</p>
                  <p className="mt-1.5 text-[0.72rem] text-ink-soft">Try another word or a shorter phrase.</p>
                </div>
              ) : (
                <>
                  <p className="px-3 py-2 text-[0.56rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
                    {results.length} passage{results.length === 1 ? "" : "s"}
                  </p>
                  {results.map((hit) => (
                    <button
                      key={hit.id}
                      type="button"
                      onClick={() => openSearchResult(hit)}
                      className="group flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-surface-muted"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-muted text-[0.56rem] font-bold text-gold transition group-hover:bg-gold-soft">
                        {hit.chapter}:{hit.verse}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.6rem] font-bold uppercase tracking-[0.13em] text-ink-faint">
                          {hit.bookName} {hit.chapter}:{hit.verse}
                        </span>
                        <span className="mt-1 block font-reading text-[0.82rem] leading-6 text-ink line-clamp-2">
                          {hit.text}
                        </span>
                      </span>
                      <Icon
                        name="arrow-right"
                        size={14}
                        className="mt-2 shrink-0 text-ink-faint opacity-0 transition group-hover:opacity-100"
                      />
                    </button>
                  ))}
                </>
              )}
            </div>

            <div className="border-t border-line px-4 py-2.5 text-[0.55rem] font-medium uppercase tracking-[0.13em] text-ink-faint">
              {activeVersion.name} · {activeVersion.code}
            </div>
          </div>
        </div>
      )}

      {pickerOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0d1713]/45 px-3 backdrop-blur-md">
          <button type="button" className="absolute inset-0 cursor-default" onClick={() => setPickerOpen(false)} aria-label="Close book browser" />
          <div className="relative flex max-h-[82vh] w-full max-w-md flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55)]">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="eyebrow text-gold">Browse Scripture</p>
                <p className="mt-1 text-[0.68rem] text-ink-faint">Choose a book, then a chapter.</p>
              </div>
              <button
                type="button"
                onClick={() => setPickerOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-ink-soft transition hover:text-ink"
                aria-label="Close book browser"
              >
                <Icon name="close" size={15} />
              </button>
            </div>
            <BookPicker currentSlug={meta.slug} onSelect={goTo} />
          </div>
        </div>
      )}
    </div>
  );
}
