"use client";

import Link from "next/link";
import { SanctuaryArt, SoftRings } from "@/components/art";
import { Icon } from "@/components/icons";
import { ListenButton } from "@/components/listen-button";
import { SaveVerseButton } from "@/components/save-verse-button";
import { getDailyEntry } from "@/data/daily";
import { readingPlans } from "@/data/plans";
import { formatLongDate, getGreeting, useToday } from "@/lib/date";
import { usePlanProgress, useSavedVerses, useStreak } from "@/lib/storage";

export function HomeExperience() {
  const today = useToday();
  const entry = getDailyEntry(today);
  const { streak } = useStreak();
  const [savedVerses] = useSavedVerses();
  const plan = readingPlans.find((item) => item.id === "psalms-of-stillness") ?? readingPlans[0];
  const completed = usePlanProgress(plan.id);
  const planProgress = Math.round((completed.length / plan.days.length) * 100);
  const recentVerse = savedVerses[0];
  const greeting = getGreeting(today);

  return (
    <div className="page-enter">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow text-gold">{formatLongDate(today)}</p>
            <span className="hidden h-1 w-1 rounded-full bg-gold/60 sm:block" />
            <span className="hidden text-[0.66rem] font-medium text-ink-faint sm:block">A new day of grace</span>
          </div>
          <h1 className="mt-3 font-display text-[2.45rem] font-medium leading-[0.98] text-ink sm:text-[3.25rem] lg:text-[3.8rem]">
            {greeting}, <span className="italic text-pine">beloved.</span>
          </h1>
          <p className="mt-3 max-w-xl text-[0.88rem] leading-6 text-ink-soft">
            Take a breath. You are here, and so is God. Let these next quiet moments be enough.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <div className="flex items-center gap-2 rounded-full border border-line bg-surface/60 py-2 pl-2.5 pr-3.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-soft text-gold">
              <Icon name="flame" size={15} />
            </span>
            <div>
              <p className="text-[0.7rem] font-bold leading-none text-ink">
                {streak} day{streak === 1 ? "" : "s"}
              </p>
              <p className="mt-1 text-[0.57rem] font-medium uppercase tracking-[0.13em] text-ink-faint">
                With God
              </p>
            </div>
          </div>
          <Link href="/journal" className="icon-btn" aria-label="Open your journal">
            <Icon name="journal" size={17} />
          </Link>
        </div>
      </header>

      <section className="mt-7 grid gap-4 lg:grid-cols-12 lg:gap-5" aria-label="Today's Scripture and stillness">
        <article className="hero-card relative flex min-h-[440px] flex-col overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:col-span-8 lg:min-h-[480px] lg:p-10">
          <SanctuaryArt className="pointer-events-none absolute -right-14 -top-20 h-[420px] w-[420px] text-[#efe2c8] opacity-55 sm:-right-10 sm:-top-24 sm:h-[500px] sm:w-[500px]" />
          <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-[#8da594]/10 blur-3xl" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-gold">
                <Icon name="sunrise" size={15} />
              </span>
              <div>
                <p className="eyebrow text-[0.58rem] !text-gold">The word for today</p>
                <p className="mt-1 text-[0.66rem] font-medium text-[#b8cbbd]">{entry.theme}</p>
              </div>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#c5d4c7]">
              Day {entry.day} of 21
            </span>
          </div>

          <div className="relative z-10 my-auto py-9 sm:py-12">
            <Icon name="quote" size={24} className="mb-4 text-gold/60" />
            <blockquote className="max-w-[56rem] font-display text-[1.9rem] font-medium leading-[1.16] tracking-[-0.025em] text-[#f7f1e4] sm:text-[2.65rem] lg:text-[3.1rem]">
              {entry.verse}
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.19em] text-[#d9cfb7]">{entry.scripture}</p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-2.5">
            <ListenButton text={`${entry.verse} ${entry.scripture}.`} variant="hero" />
            <SaveVerseButton reference={entry.scripture} text={entry.verse} variant="hero" />
            <Link
              href={`/devotions/${entry.id}`}
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 text-[0.72rem] font-semibold text-[#cfdbd1] transition hover:text-white"
            >
              Sit with this
              <Icon name="arrow-right" size={14} />
            </Link>
          </div>
        </article>

        <article className="card relative flex flex-col overflow-hidden p-6 sm:p-7 lg:col-span-4">
          <SoftRings className="pointer-events-none absolute -right-24 -top-24 h-[330px] w-[330px] text-pine opacity-50" />
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow text-gold">A moment of stillness</p>
              <p className="mt-2 text-[0.72rem] font-medium text-ink-faint">5 guided minutes</p>
            </div>
            <span className="chip !bg-sage-soft/60 !text-pine">
              <Icon name="wind" size={12} />
              Breathe
            </span>
          </div>

          <div className="relative z-10 my-6 flex flex-1 flex-col items-center justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-line" />
              <div className="absolute inset-3 rounded-full border border-gold/20" />
              <div className="breath-orb absolute inset-5 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--sage-soft),var(--gold-soft))] shadow-[0_20px_55px_-25px_rgba(193,160,95,0.8)]" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="eyebrow text-[0.52rem] text-pine/70">Inhale</span>
                <span className="mt-1 max-w-[6.5rem] font-display text-[1.35rem] font-semibold leading-tight text-pine">
                  {entry.breatheIn}
                </span>
                <span className="my-2 h-px w-7 bg-pine/20" />
                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-pine/55">
                  Exhale {entry.breatheOut}
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-[15rem] text-center font-reading text-[0.84rem] italic leading-6 text-ink-soft">
              “{entry.meditation}”
            </p>
          </div>

          <Link href="/meditate" className="btn-primary relative z-10 w-full">
            Begin stillness
            <Icon name="play" size={13} />
          </Link>
        </article>
      </section>

      <section className="mt-4 grid gap-4 lg:mt-5 lg:grid-cols-12 lg:gap-5" aria-label="Today's devotion and word">
        <article className="card relative overflow-hidden p-6 sm:p-8 lg:col-span-7">
          <div className="absolute bottom-8 left-0 top-8 w-[2px] rounded-full bg-gradient-to-b from-gold/0 via-gold/70 to-gold/0" />
          <div className="pl-2 sm:pl-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="eyebrow text-gold">Today’s devotion</span>
                <span className="h-1 w-1 rounded-full bg-line-strong" />
                <span className="text-[0.64rem] font-medium text-ink-faint">{entry.readTime} min read</span>
              </div>
              <span className="chip">{entry.theme}</span>
            </div>

            <h2 className="mt-5 font-display text-[2.2rem] font-medium leading-none text-ink sm:text-[2.65rem]">
              {entry.title}
            </h2>
            <p className="mt-4 max-w-xl text-[0.86rem] leading-[1.75] text-ink-soft">{entry.summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href={`/devotions/${entry.id}`} className="btn-primary">
                Read the devotion
                <Icon name="arrow-right" size={14} />
              </Link>
              <SaveVerseButton reference={entry.scripture} text={entry.verse} variant="pill" />
            </div>
          </div>
        </article>

        <div className="grid gap-4 lg:col-span-5 lg:gap-5">
          <article className="relative overflow-hidden rounded-[1.65rem] border border-gold/20 bg-[linear-gradient(135deg,var(--gold-soft),color-mix(in_srgb,var(--surface)_50%,var(--gold-soft)))] p-6">
            <Icon name="sparkle" size={20} className="absolute right-5 top-5 text-gold/60" />
            <p className="eyebrow text-gold">Word of the day</p>
            <div className="mt-3 flex items-end gap-4">
              <h2 className="font-display text-[3rem] font-semibold leading-none text-pine sm:text-[3.4rem]">
                {entry.word}
              </h2>
              <span className="mb-1.5 h-px flex-1 bg-gold/30" />
            </div>
            <p className="mt-3 max-w-sm text-[0.78rem] leading-6 text-ink-soft">{entry.wordMeaning}</p>
            <Link
              href={`/devotions/${entry.id}`}
              className="mt-5 inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.13em] text-pine transition hover:text-gold"
            >
              Carry this word
              <Icon name="arrow-right" size={13} />
            </Link>
          </article>

          <article className="card flex items-center gap-4 p-5">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pine text-[#f7f1e4]">
              <Icon name="plans" size={21} />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-surface bg-gold text-[0.54rem] font-bold text-pine">
                {completed.length}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-ink-faint">Continue your journey</p>
              <h3 className="mt-1 truncate font-display text-xl font-semibold text-ink">{plan.title}</h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-strong">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${planProgress}%` }} />
                </div>
                <span className="text-[0.6rem] font-semibold text-ink-faint">
                  {completed.length}/{plan.days.length}
                </span>
              </div>
            </div>
            <Link href="/plans" aria-label="Open reading plans" className="icon-btn !h-9 !w-9 shrink-0">
              <Icon name="chevron-right" size={15} />
            </Link>
          </article>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:mt-5 lg:grid-cols-12 lg:gap-5" aria-label="Scripture and saved verses">
        <article className="relative overflow-hidden rounded-[1.65rem] border border-line bg-surface-muted p-6 sm:p-8 lg:col-span-7">
          <div className="soft-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative z-10 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div className="max-w-md">
              <p className="eyebrow text-gold">Explore Scripture</p>
              <h2 className="mt-3 font-display text-[2rem] font-medium leading-[1.02] text-ink sm:text-[2.4rem]">
                The whole Bible,
                <br />
                <span className="italic text-pine">one quiet page at a time.</span>
              </h2>
              <p className="mt-3 text-[0.8rem] leading-6 text-ink-soft">
                All 66 books. Search a word, follow a passage, or simply open where you left off.
              </p>
            </div>
            <Link href="/bible" className="btn-primary shrink-0">
              Open the Bible
              <Icon name="arrow-right" size={14} />
            </Link>
          </div>
          <div className="relative z-10 mt-6 flex flex-wrap gap-2">
            <Link href="/bible#psalms:23" className="chip transition hover:border-gold/40 hover:text-pine">
              Psalm 23
            </Link>
            <Link href="/bible#john:14" className="chip transition hover:border-gold/40 hover:text-pine">
              John 14
            </Link>
            <Link href="/bible#romans:8" className="chip transition hover:border-gold/40 hover:text-pine">
              Romans 8
            </Link>
            <Link href="/bible#search" className="chip transition hover:border-gold/40 hover:text-pine">
              <Icon name="search" size={11} />
              Search a word
            </Link>
          </div>
        </article>

        <article className="card flex flex-col p-6 lg:col-span-5">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-gold">Your quiet corner</p>
            <Icon name="bookmark" size={17} className="text-ink-faint" />
          </div>
          {recentVerse ? (
            <>
              <blockquote className="mt-4 font-reading text-[0.93rem] italic leading-[1.8] text-ink line-clamp-3">
                “{recentVerse.text}”
              </blockquote>
              <p className="mt-3 text-[0.63rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
                {recentVerse.reference}
              </p>
              <div className="mt-auto flex items-center justify-between pt-5">
                <Link
                  href={`/bible#${recentVerse.bookSlug}:${recentVerse.chapter}:${recentVerse.verse}`}
                  className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-pine transition hover:text-gold"
                >
                  Open passage
                  <Icon name="arrow-right" size={12} />
                </Link>
                <Link href="/journal" className="text-[0.66rem] font-semibold text-ink-faint transition hover:text-ink">
                  All saved ({savedVerses.length})
                </Link>
              </div>
            </>
          ) : (
            <>
              <h3 className="mt-4 font-display text-[1.7rem] font-medium leading-tight text-ink">
                Save what speaks to you.
              </h3>
              <p className="mt-2 text-[0.78rem] leading-6 text-ink-soft">
                Keep a verse close, then return to it when your soul needs the reminder. Your saved words will wait
                here.
              </p>
              <div className="mt-auto flex items-center justify-between pt-5">
                <Link href="/bible" className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-pine transition hover:text-gold">
                  Find a verse
                  <Icon name="arrow-right" size={12} />
                </Link>
                <Link href="/journal" className="text-[0.66rem] font-semibold text-ink-faint transition hover:text-ink">
                  Open journal
                </Link>
              </div>
            </>
          )}
        </article>
      </section>

      <section className="relative mt-6 overflow-hidden rounded-[1.65rem] border border-line bg-surface/50 px-6 py-8 text-center sm:px-10">
        <div className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="mx-auto max-w-2xl font-reading text-[0.95rem] italic leading-7 text-ink-soft">
          “In quietness and in confidence shall be your strength.”
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-ink-faint">
          <Link href="/devotions" className="transition hover:text-gold">
            Read
          </Link>
          <span className="h-1 w-1 rounded-full bg-gold/50" />
          <Link href="/meditate" className="transition hover:text-gold">
            Pray
          </Link>
          <span className="h-1 w-1 rounded-full bg-gold/50" />
          <Link href="/plans" className="transition hover:text-gold">
            Rest
          </Link>
        </div>
      </section>
    </div>
  );
}
