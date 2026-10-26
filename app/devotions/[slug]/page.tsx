import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SanctuaryArt } from "@/components/art";
import { Icon } from "@/components/icons";
import { ListenButton } from "@/components/listen-button";
import { ReflectionComposer } from "@/components/reflection-composer";
import { SaveVerseButton } from "@/components/save-verse-button";
import { dailyEntries, getAdjacentEntry, getEntryById } from "@/data/daily";
import { parseScriptureReference } from "@/lib/reference";

type DevotionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return dailyEntries.map((entry) => ({ slug: entry.id }));
}

export async function generateMetadata({ params }: DevotionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryById(slug);
  if (!entry) return { title: "Devotion" };
  return {
    title: entry.title,
    description: entry.summary,
  };
}

export default async function DevotionPage({ params }: DevotionPageProps) {
  const { slug } = await params;
  const entry = getEntryById(slug);
  if (!entry) notFound();

  const previous = getAdjacentEntry(entry.id, -1);
  const next = getAdjacentEntry(entry.id, 1);
  const context = parseScriptureReference(entry.scripture);

  return (
    <div className="page-enter mx-auto max-w-6xl">
      <Link
        href="/devotions"
        className="inline-flex items-center gap-2 text-[0.68rem] font-semibold text-ink-faint transition hover:text-pine"
      >
        <Icon name="chevron-left" size={13} />
        All devotions
      </Link>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow text-gold">Day {`${entry.day}`.padStart(2, "0")}</span>
          <span className="h-1 w-1 rounded-full bg-line-strong" />
          <span className="text-[0.64rem] font-medium text-ink-faint">{entry.theme}</span>
          <span className="h-1 w-1 rounded-full bg-line-strong" />
          <span className="flex items-center gap-1.5 text-[0.64rem] font-medium text-ink-faint">
            <Icon name="clock" size={11} />
            {entry.readTime} min read
          </span>
        </div>
        <h1 className="mt-4 font-display text-[2.8rem] font-medium leading-[0.98] text-ink sm:text-[4rem]">
          {entry.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[0.88rem] leading-7 text-ink-soft">{entry.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <ListenButton text={`${entry.title}. ${entry.verse} ${entry.scripture}. ${entry.reflection.join(" ")} ${entry.prayer}`} />
          <SaveVerseButton reference={entry.scripture} text={entry.verse} />
          <Link
            href={context ? `/bible#${context.bookSlug}:${context.chapter}` : "/bible"}
            className="btn-ghost"
          >
            <Icon name="bible" size={13} />
            Read in context
          </Link>
        </div>
      </header>

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-5">
          <article className="hero-card relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
            <SanctuaryArt className="pointer-events-none absolute -right-16 -top-20 h-80 w-80 text-[#efe2c8] opacity-45" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <Icon name="quote" size={22} className="text-gold/70" />
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[0.54rem] font-bold uppercase tracking-[0.16em] text-[#c5d4c7]">
                  {entry.word}
                </span>
              </div>
              <blockquote className="mt-5 font-display text-[1.85rem] font-medium leading-[1.23] text-[#f7f1e4] sm:text-[2.35rem]">
                {entry.verse}
              </blockquote>
              <p className="mt-5 text-[0.63rem] font-bold uppercase tracking-[0.18em] text-gold">
                {entry.scripture}
              </p>
            </div>
          </article>

          <article className="card p-6 sm:p-9">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-soft text-gold">
                <Icon name="devotion" size={16} />
              </span>
              <div>
                <p className="eyebrow text-gold">The reflection</p>
                <p className="mt-1 text-[0.64rem] text-ink-faint">Let the Word settle slowly</p>
              </div>
            </div>
            <div className="devotion-copy mt-6 font-reading text-[1rem] leading-[1.95] text-ink-soft">
              {entry.reflection.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-gold/20 bg-gold-soft/30 p-5">
              <div className="flex items-center gap-2">
                <Icon name="sun" size={14} className="text-gold" />
                <p className="eyebrow text-gold">Carry this with you</p>
              </div>
              <p className="mt-3 font-reading text-[0.94rem] italic leading-7 text-ink">
                “{entry.meditation}”
              </p>
            </div>
          </article>

          <article className="card border-gold/20 p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <Icon name="meditate" size={17} className="text-gold" />
              <p className="eyebrow text-gold">A prayer</p>
            </div>
            <p className="mt-4 font-reading text-[1.02rem] italic leading-8 text-ink">{entry.prayer}</p>
            <div className="mt-5 flex items-center gap-2 text-[0.62rem] font-medium text-ink-faint">
              <Icon name="wind" size={11} />
              Breathe in: {entry.breatheIn} · Breathe out: {entry.breatheOut}
            </div>
          </article>
        </div>

        <aside className="space-y-4 self-start lg:sticky lg:top-6">
          <div className="card p-5">
            <p className="eyebrow text-gold">Word of the day</p>
            <h2 className="mt-3 font-display text-[2.8rem] font-semibold leading-none text-pine">{entry.word}</h2>
            <p className="mt-2 text-[0.72rem] leading-5 text-ink-soft">{entry.wordMeaning}</p>

            <div className="my-5 h-px bg-line" />

            <ReflectionComposer prompt={entry.prompt} reference={entry.scripture} titleSeed={entry.title} />

            <div className="my-5 h-px bg-line" />

            <p className="text-[0.56rem] font-bold uppercase tracking-[0.16em] text-ink-faint">Continue the journey</p>
            <div className="mt-3 space-y-2">
              <Link
                href={`/devotions/${previous.id}`}
                className="flex items-center gap-2 rounded-xl border border-line bg-surface/60 p-2.5 transition hover:border-line-strong"
              >
                <Icon name="chevron-left" size={13} className="text-ink-faint" />
                <span className="min-w-0">
                  <span className="block text-[0.52rem] font-bold uppercase tracking-[0.12em] text-ink-faint">
                    Previous
                  </span>
                  <span className="block truncate text-[0.7rem] font-semibold text-ink">{previous.title}</span>
                </span>
              </Link>
              <Link
                href={`/devotions/${next.id}`}
                className="flex items-center gap-2 rounded-xl border border-line bg-surface/60 p-2.5 text-right transition hover:border-line-strong"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.52rem] font-bold uppercase tracking-[0.12em] text-ink-faint">
                    Next
                  </span>
                  <span className="block truncate text-[0.7rem] font-semibold text-ink">{next.title}</span>
                </span>
                <Icon name="chevron-right" size={13} className="text-ink-faint" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
