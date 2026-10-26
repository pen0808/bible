"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icons";
import { formatJournalDate } from "@/lib/date";
import {
  addJournalEntry,
  deleteJournalEntry,
  removeSavedVerse,
  useJournalEntries,
  useMeditationSessions,
  useSavedVerses,
} from "@/lib/storage";
import { showToast } from "@/lib/toast";

export function JournalExperience() {
  const [savedVerses] = useSavedVerses();
  const [entries] = useJournalEntries();
  const [sessions] = useMeditationSessions();
  const [tab, setTab] = useState<"verses" | "reflections">("verses");
  const [title, setTitle] = useState("");
  const [reference, setReference] = useState("");
  const [body, setBody] = useState("");
  const totalMinutes = sessions.reduce((total, session) => total + session.minutes, 0);

  const copyVerse = async (text: string, verseReference: string) => {
    try {
      await navigator.clipboard.writeText(`“${text}” — ${verseReference} (KJV)`);
      showToast("Verse copied.", "gold");
    } catch {
      showToast("Unable to copy this verse.");
    }
  };

  const saveReflection = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!body.trim()) return;
    addJournalEntry({
      title: title.trim() || "A quiet reflection",
      reference: reference.trim() || undefined,
      body: body.trim(),
    });
    setTitle("");
    setReference("");
    setBody("");
    showToast("Reflection saved.", "gold");
  };

  return (
    <div className="page-enter">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-gold">Your journal</p>
          <h1 className="mt-3 font-display text-[2.8rem] font-medium leading-[0.96] text-ink sm:text-[3.7rem]">
            A place to
            <br />
            <span className="italic text-pine">remember grace.</span>
          </h1>
          <p className="mt-4 max-w-xl text-[0.87rem] leading-6 text-ink-soft">
            The verses you keep and the prayers you write are stones of remembrance. Return to them whenever your soul
            needs to remember.
          </p>
        </div>
        <Link href="/bible" className="btn-primary self-start">
          <Icon name="bible" size={14} />
          Open Scripture
        </Link>
      </header>

      <section className="mt-7 grid grid-cols-3 gap-2.5 sm:max-w-md">
        {[
          { label: "Saved verses", value: savedVerses.length, icon: "bookmark" as const },
          { label: "Reflections", value: entries.length, icon: "pen" as const },
          { label: "Stillness", value: `${totalMinutes}m`, icon: "wind" as const },
        ].map((stat) => (
          <div key={stat.label} className="card p-4">
            <Icon name={stat.icon} size={15} className="text-gold" />
            <p className="mt-3 font-display text-[1.8rem] font-semibold leading-none text-pine">{stat.value}</p>
            <p className="mt-1.5 text-[0.52rem] font-bold uppercase tracking-[0.13em] text-ink-faint">{stat.label}</p>
          </div>
        ))}
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-12 lg:gap-5">
        <div className="min-w-0 lg:col-span-8">
          <div className="flex items-center justify-between border-b border-line">
            <div className="flex gap-5">
              {[
                { id: "verses" as const, label: "Saved verses", count: savedVerses.length },
                { id: "reflections" as const, label: "Reflections", count: entries.length },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`relative pb-3 text-[0.76rem] font-semibold transition ${
                    tab === item.id ? "text-ink" : "text-ink-faint hover:text-ink-soft"
                  }`}
                >
                  {item.label}
                  <span className="ml-1.5 text-[0.62rem] text-ink-faint">{item.count}</span>
                  {tab === item.id && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-gold" />}
                </button>
              ))}
            </div>
            <span className="hidden text-[0.58rem] text-ink-faint sm:block">Stored privately on this device</span>
          </div>

          {tab === "verses" ? (
            <div className="mt-5 space-y-3">
              {savedVerses.length === 0 ? (
                <EmptyState
                  icon="bookmark"
                  title="No saved verses yet"
                  copy="As you read, tap any verse to keep it here. The words that speak to you now will become a place of return later."
                  href="/bible"
                  linkLabel="Find a verse"
                />
              ) : (
                savedVerses.map((verse) => (
                  <article key={verse.id} className="card group p-5 transition hover:border-line-strong">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-soft text-gold">
                          <Icon name="bookmark" size={13} />
                        </span>
                        <div>
                          <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-gold">
                            {verse.reference}
                          </p>
                          <p className="mt-0.5 text-[0.56rem] text-ink-faint">
                            Saved {formatJournalDate(verse.savedAt)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          removeSavedVerse(verse.id);
                          showToast("Saved verse removed.");
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-faint opacity-60 transition hover:bg-surface-muted hover:text-clay"
                        aria-label="Remove saved verse"
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    </div>
                    <blockquote className="mt-4 font-reading text-[0.92rem] italic leading-[1.8] text-ink">
                      “{verse.text}”
                    </blockquote>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <Link
                        href={`/bible#${verse.bookSlug}:${verse.chapter}:${verse.verse}`}
                        className="inline-flex items-center gap-1.5 text-[0.64rem] font-semibold text-pine transition hover:text-gold"
                      >
                        Open passage
                        <Icon name="arrow-right" size={11} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => copyVerse(verse.text, verse.reference)}
                        className="inline-flex items-center gap-1.5 text-[0.62rem] font-medium text-ink-faint transition hover:text-ink"
                      >
                        <Icon name="copy" size={11} />
                        Copy
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {entries.length === 0 ? (
                <EmptyState
                  icon="pen"
                  title="Your first reflection is waiting"
                  copy="Write what you notice, what you feel, or what you want to remember. There is no right way to do this—only honesty."
                />
              ) : (
                entries.map((entry) => (
                  <article key={entry.id} className="card group p-5 transition hover:border-line-strong">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.56rem] font-bold uppercase tracking-[0.14em] text-gold">
                          {formatJournalDate(entry.createdAt)}
                        </p>
                        <h3 className="mt-1.5 font-display text-[1.55rem] font-semibold leading-tight text-ink">
                          {entry.title}
                        </h3>
                        {entry.reference && (
                          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-surface-muted px-2.5 py-1 text-[0.56rem] font-semibold text-ink-faint">
                            <Icon name="bookmark" size={9} />
                            {entry.reference}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          deleteJournalEntry(entry.id);
                          showToast("Reflection removed.");
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-faint opacity-60 transition hover:bg-surface-muted hover:text-clay"
                        aria-label="Delete reflection"
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap font-reading text-[0.88rem] leading-7 text-ink-soft">
                      {entry.body}
                    </p>
                  </article>
                ))
              )}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="card p-5 lg:sticky lg:top-6">
            <div className="flex items-center gap-2">
              <Icon name="pen" size={16} className="text-gold" />
              <p className="eyebrow text-gold">New reflection</p>
            </div>
            <form onSubmit={saveReflection} className="mt-4">
              <label htmlFor="journal-title" className="sr-only">
                Title
              </label>
              <input
                id="journal-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Title (optional)"
                className="w-full border-b border-line bg-transparent pb-2 font-display text-lg text-ink outline-none placeholder:text-ink-faint focus:border-gold/60"
              />
              <label htmlFor="journal-reference" className="sr-only">
                Scripture reference
              </label>
              <input
                id="journal-reference"
                value={reference}
                onChange={(event) => setReference(event.target.value)}
                placeholder="Scripture reference (optional)"
                className="mt-3 w-full rounded-xl border border-line bg-surface/60 px-3 py-2 text-[0.68rem] text-ink outline-none placeholder:text-ink-faint focus:border-gold/50"
              />
              <label htmlFor="journal-body" className="sr-only">
                Reflection
              </label>
              <textarea
                id="journal-body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={6}
                placeholder="What is God stirring in you today?"
                className="mt-3 w-full resize-none rounded-2xl border border-line bg-surface/60 p-3.5 font-reading text-[0.82rem] leading-6 text-ink outline-none placeholder:text-ink-faint focus:border-gold/50"
              />
              <button
                type="submit"
                disabled={!body.trim()}
                className="btn-primary mt-3 w-full disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save reflection
                <Icon name="arrow-right" size={13} />
              </button>
            </form>
            <p className="mt-3 text-center text-[0.56rem] leading-4 text-ink-faint">
              Your words stay in this browser. Nothing is shared.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  copy,
  href,
  linkLabel,
}: {
  icon: "bookmark" | "pen";
  title: string;
  copy: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold">
        <Icon name={icon} size={20} />
      </span>
      <h3 className="mt-4 font-display text-[1.65rem] font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-[0.76rem] leading-6 text-ink-soft">{copy}</p>
      {href && linkLabel && (
        <Link href={href} className="btn-ghost mt-5">
          {linkLabel}
          <Icon name="arrow-right" size={13} />
        </Link>
      )}
    </div>
  );
}
