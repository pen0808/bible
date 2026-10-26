"use client";

import { Icon } from "@/components/icons";
import { parseScriptureReference } from "@/lib/reference";
import { toggleSavedVerse, useSavedVerses } from "@/lib/storage";
import { showToast } from "@/lib/toast";

type SaveVerseButtonProps = {
  reference: string;
  text: string;
  variant?: "pill" | "icon" | "soft" | "hero";
  label?: boolean;
  className?: string;
};

export function SaveVerseButton({
  reference,
  text,
  variant = "pill",
  label = true,
  className = "",
}: SaveVerseButtonProps) {
  const [savedVerses] = useSavedVerses();
  const parsed = parseScriptureReference(reference);
  const id = parsed
    ? `${parsed.bookSlug}-${parsed.chapter}-${parsed.verse}`
    : reference.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const saved = savedVerses.some((verse) => verse.id === id);

  const handleSave = () => {
    if (!parsed) {
      showToast("This passage could not be saved.");
      return;
    }

    const nowSaved = toggleSavedVerse({
      id,
      reference,
      text,
      bookName: parsed.bookName,
      bookSlug: parsed.bookSlug,
      chapter: parsed.chapter,
      verse: parsed.verse,
    });

    showToast(nowSaved ? "Verse saved to your journal." : "Verse removed from saved.", nowSaved ? "gold" : "default");
  };

  const styles = {
    pill: `inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2.5 text-[0.74rem] font-semibold transition hover:border-line-strong hover:bg-surface ${
      saved ? "text-gold" : "text-ink-soft"
    }`,
    hero: `inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2.5 text-[0.72rem] font-semibold text-[#f4efe3] backdrop-blur-sm transition hover:bg-white/[0.13] ${
      saved ? "!text-gold" : ""
    }`,
    soft: `inline-flex items-center gap-2 rounded-full bg-sage-soft/70 px-4 py-2.5 text-[0.74rem] font-semibold text-pine transition hover:bg-sage-soft ${
      saved ? "text-gold" : ""
    }`,
    icon: `icon-btn ${saved ? "!text-gold !border-gold/40" : ""}`,
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      aria-pressed={saved}
      aria-label={saved ? "Remove saved verse" : "Save verse"}
      className={`${styles[variant]} ${className}`}
    >
      <Icon name={saved ? "bookmark" : "bookmark"} size={15} strokeWidth={saved ? 2.2 : 1.6} />
      {label && variant !== "icon" && <span>{saved ? "Saved" : "Save verse"}</span>}
    </button>
  );
}
