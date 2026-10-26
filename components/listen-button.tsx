"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { showToast } from "@/lib/toast";

type ListenButtonProps = {
  text: string;
  variant?: "hero" | "soft" | "icon";
  label?: string;
  className?: string;
};

export function ListenButton({ text, variant = "soft", label = "Listen", className = "" }: ListenButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      showToast("Audio reading is not available in this browser.");
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.82;
    utterance.pitch = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const styles = {
    hero: "inline-flex items-center gap-2 rounded-full bg-[#f4efe3] px-4 py-2.5 text-[0.72rem] font-bold text-pine-deep transition hover:bg-white",
    soft: "inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2.5 text-[0.74rem] font-semibold text-ink-soft transition hover:border-line-strong hover:bg-surface",
    icon: "icon-btn",
  };

  return (
    <button
      type="button"
      onClick={toggleSpeech}
      className={`${styles[variant]} ${className}`}
      aria-label={speaking ? "Stop reading" : "Listen to passage"}
    >
      <Icon name={speaking ? "pause" : "volume"} size={15} strokeWidth={1.9} />
      {variant !== "icon" && <span>{speaking ? "Pause" : label}</span>}
    </button>
  );
}
