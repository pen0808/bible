"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { addJournalEntry } from "@/lib/storage";
import { showToast } from "@/lib/toast";

type ReflectionComposerProps = {
  prompt: string;
  reference: string;
  titleSeed: string;
};

export function ReflectionComposer({ prompt, reference, titleSeed }: ReflectionComposerProps) {
  const [body, setBody] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!body.trim()) return;

    addJournalEntry({
      title: titleSeed,
      body: body.trim(),
      reference,
    });
    setSaved(true);
    showToast("Reflection saved to your journal.", "gold");
  };

  if (saved) {
    return (
      <div className="rounded-2xl border border-sage/30 bg-sage-soft/40 p-5 text-center">
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-sage-soft text-pine">
          <Icon name="check" size={18} strokeWidth={2.3} />
        </span>
        <p className="mt-3 font-display text-xl font-semibold text-ink">Kept in your journal</p>
        <p className="mt-1 text-[0.7rem] leading-5 text-ink-soft">
          Your reflection is waiting for you whenever you want to return to it.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Link href="/journal" className="btn-primary !py-2.5">
            Open journal
          </Link>
          <button
            type="button"
            onClick={() => {
              setBody("");
              setSaved(false);
            }}
            className="btn-ghost !py-2.5"
          >
            Write more
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="reflection" className="eyebrow text-gold">
        Write a reflection
      </label>
      <p className="mt-2 text-[0.76rem] leading-6 text-ink-soft">{prompt}</p>
      <textarea
        id="reflection"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        rows={5}
        placeholder="What is stirring in your heart?"
        className="mt-3 w-full resize-none rounded-2xl border border-line bg-surface/70 p-4 font-reading text-[0.86rem] leading-7 text-ink outline-none transition placeholder:text-ink-faint focus:border-gold/50"
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-[0.6rem] text-ink-faint">{body.length} characters</span>
        <button type="submit" disabled={!body.trim()} className="btn-primary !py-2.5 disabled:cursor-not-allowed disabled:opacity-40">
          Save reflection
          <Icon name="pen" size={13} />
        </button>
      </div>
    </form>
  );
}
