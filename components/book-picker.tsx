"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import {
  newTestamentBooks,
  oldTestamentBooks,
  type BibleBookMeta,
  type Testament,
} from "@/data/books";

type BookPickerProps = {
  currentSlug: string;
  onSelect: (slug: string, chapter: number) => void;
};

export function BookPicker({ currentSlug, onSelect }: BookPickerProps) {
  const [testament, setTestament] = useState<Testament>("Old");
  const [expanded, setExpanded] = useState<BibleBookMeta | null>(null);

  const books = testament === "Old" ? oldTestamentBooks : newTestamentBooks;
  const groups = useMemo(() => {
    const map = new Map<string, BibleBookMeta[]>();
    for (const book of books) {
      const list = map.get(book.group) ?? [];
      list.push(book);
      map.set(book.group, list);
    }
    return Array.from(map.entries());
  }, [books]);

  if (expanded) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded(null)}
          className="mb-4 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-ink-faint transition hover:text-pine"
        >
          <Icon name="chevron-left" size={13} />
          All books
        </button>
        <div className="mb-4">
          <p className="eyebrow text-gold">Choose a chapter</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{expanded.name}</h3>
          <p className="mt-1 text-[0.67rem] text-ink-faint">
            {expanded.chapters} chapter{expanded.chapters === 1 ? "" : "s"} · {expanded.testament} Testament
          </p>
        </div>
        <div className="grid max-h-[52vh] grid-cols-5 gap-1.5 overflow-y-auto pr-1 thin-scroll sm:grid-cols-6 xl:grid-cols-5">
          {Array.from({ length: expanded.chapters }, (_, index) => index + 1).map((chapter) => (
            <button
              key={chapter}
              type="button"
              onClick={() => {
                onSelect(expanded.slug, chapter);
                setExpanded(null);
              }}
              className="flex aspect-square items-center justify-center rounded-xl border border-line bg-surface/60 text-[0.72rem] font-semibold text-ink-soft transition hover:border-gold/40 hover:bg-gold-soft/50 hover:text-pine"
            >
              {chapter}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <p className="eyebrow mr-auto text-gold">Books of the Bible</p>
        <span className="text-[0.58rem] font-medium text-ink-faint">66 books</span>
      </div>

      <div className="mb-4 flex rounded-full border border-line bg-surface/55 p-1">
        {(["Old", "New"] as Testament[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTestament(item)}
            className={`flex-1 rounded-full px-3 py-2 text-[0.66rem] font-semibold transition ${
              testament === item ? "bg-pine text-[#f7f1e4] shadow-sm" : "text-ink-faint hover:text-ink"
            }`}
          >
            {item} Testament
          </button>
        ))}
      </div>

      <div className="max-h-[55vh] space-y-4 overflow-y-auto pr-1.5 thin-scroll">
        {groups.map(([group, groupBooks]) => (
          <div key={group}>
            <p className="mb-1.5 px-1 text-[0.53rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
              {group}
            </p>
            <div className="space-y-0.5">
              {groupBooks.map((book) => {
                const active = book.slug === currentSlug;
                return (
                  <button
                    key={book.slug}
                    type="button"
                    onClick={() => setExpanded(book)}
                    className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-[0.72rem] transition ${
                      active
                        ? "bg-pine text-[#f7f1e4]"
                        : "text-ink-soft hover:bg-surface-muted hover:text-ink"
                    }`}
                  >
                    <span className={`h-1 w-1 shrink-0 rounded-full ${active ? "bg-gold" : "bg-transparent"}`} />
                    <span className="flex-1 truncate font-medium">{book.name}</span>
                    <span className={`text-[0.58rem] ${active ? "text-[#c5d4c7]" : "text-ink-faint"}`}>
                      {book.chapters}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-[0.58rem] text-ink-faint">
        <Icon name="bible" size={11} />
        King James Version
      </p>
    </div>
  );
}
