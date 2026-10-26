"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SanctuaryArt } from "@/components/art";
import { Icon } from "@/components/icons";
import { SaveVerseButton } from "@/components/save-verse-button";
import { dailyEntries, getDailyEntry } from "@/data/daily";
import { useToday } from "@/lib/date";

export function DevotionsLibrary() {
  const today = useToday();
  const todayEntry = getDailyEntry(today);
  const [theme, setTheme] = useState("All");
  const themes = useMemo(() => ["All", ...Array.from(new Set(dailyEntries.map((entry) => entry.theme)))], []);
  const entries = theme === "All" ? dailyEntries : dailyEntries.filter((entry) => entry.theme === theme);

  return (
    <div className="page-enter">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-gold">Daily devotions</p>
          <h1 className="mt-3 font-display text-[2.7rem] font-medium leading-[0.98] text-ink sm:text-[3.6rem]">
            Make room for
            <br />
            <span className="italic text-pine">the Word.</span>
          </h1>
          <p className="mt-4 max-w-xl text-[0.87rem] leading-6 text-ink-soft">
            Twenty-one unhurried reflections for ordinary days. Read slowly, breathe deeply, and let one truth stay
            with you.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <span className="chip">
            <Icon name="devotion" size={12} className="text-gold" />
            21 reflections
          </span>
          <Link href={`/devotions/${todayEntry.id}`} className="btn-primary">
            Today’s devotion
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </header>

      <section className="mt-7 grid gap-4 lg:grid-cols-12 lg:gap-5">
        <article className="hero-card relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:col-span-8">
          <SanctuaryArt className="pointer-events-none absolute -right-12 -top-12 h-80 w-80 text-[#efe2c8] opacity-45" />
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[0.56rem] font-bold uppercase tracking-[0.16em] text-gold">
                Today · Day {todayEntry.day}
              </span>
              <span className="text-[0.64rem] font-medium text-[#b8cbbd]">{todayEntry.readTime} min read</span>
            </div>
            <h2 className="mt-7 max-w-xl font-display text-[2.3rem] font-medium leading-[1.03] text-[#f7f1e4] sm:text-[3rem]">
              {todayEntry.title}
            </h2>
            <p className="mt-4 max-w-xl text-[0.82rem] leading-6 text-[#c5d4c7]">{todayEntry.summary}</p>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <Link href={`/devotions/${todayEntry.id}`} className="btn-gold">
                Sit with today’s Word
                <Icon name="arrow-right" size={14} />
              </Link>
              <SaveVerseButton reference={todayEntry.scripture} text={todayEntry.verse} variant="hero" label={false} />
            </div>
            <p className="mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-[#9fb3a5]">
              {todayEntry.scripture} · {todayEntry.word}
            </p>
          </div>
        </article>

        <aside className="card relative overflow-hidden p-6 lg:col-span-4">
          <Icon name="sparkle" size={18} className="text-gold" />
          <p className="eyebrow mt-4 text-gold">A gentle rhythm</p>
          <h2 className="mt-3 font-display text-[1.8rem] font-medium leading-tight text-ink">
            How to sit with a devotion
          </h2>
          <div className="mt-6 space-y-5">
            {[
              ["Read", "Let the Scripture set the pace. Read it twice, once with your mind and once with your heart."],
              ["Reflect", "Notice the word or phrase that catches you. Ask God what He is saying through it."],
              ["Rest", "Close your eyes for a minute. Carry one sentence into the rest of your day."],
            ].map(([title, copy], index) => (
              <div key={title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-soft text-[0.6rem] font-bold text-gold">
                  {index + 1}
                </span>
                <div>
                  <p className="text-[0.75rem] font-bold text-ink">{title}</p>
                  <p className="mt-1 text-[0.7rem] leading-5 text-ink-soft">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-gold">The collection</p>
          <h2 className="mt-2 font-display text-[2rem] font-medium text-ink">A word for every season</h2>
        </div>
        <div className="flex max-w-full flex-wrap gap-1.5 overflow-x-auto">
          {themes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTheme(item)}
              className={`chip shrink-0 transition ${
                theme === item ? "!border-pine !bg-pine !text-[#f7f1e4]" : "hover:border-line-strong hover:text-ink"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {entries.map((entry) => (
          <Link
            key={entry.id}
            href={`/devotions/${entry.id}`}
            className="card group relative flex flex-col overflow-hidden p-5 transition duration-300 hover:-translate-y-0.5 hover:border-line-strong"
          >
            <div className="flex items-center justify-between">
              <span className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                Day {`${entry.day}`.padStart(2, "0")}
              </span>
              <span className="chip !border-transparent !bg-surface-muted !px-2.5 !py-1 !text-[0.58rem]">
                {entry.theme}
              </span>
            </div>
            <h3 className="mt-5 font-display text-[1.65rem] font-medium leading-tight text-ink transition group-hover:text-pine">
              {entry.title}
            </h3>
            <p className="mt-2 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-gold">{entry.scripture}</p>
            <p className="mt-3 text-[0.75rem] leading-5 text-ink-soft line-clamp-3">{entry.summary}</p>
            <div className="mt-auto flex items-center justify-between pt-6">
              <div className="flex items-center gap-1.5 text-[0.62rem] font-medium text-ink-faint">
                <Icon name="clock" size={11} />
                {entry.readTime} min
                <span className="mx-1 h-1 w-1 rounded-full bg-line-strong" />
                {entry.word}
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-faint transition group-hover:border-gold/30 group-hover:bg-gold-soft group-hover:text-pine">
                <Icon name="arrow-right" size={14} />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
