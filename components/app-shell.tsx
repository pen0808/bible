"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/logo";
import { Icon, type IconName } from "@/components/icons";
import { ToastViewport } from "@/components/toast-viewport";
import { useStreak, useTheme } from "@/lib/storage";

type NavItem = {
  label: string;
  href: string;
  icon: IconName;
  mobile?: boolean;
};

const primaryNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Daily",
    items: [
      { label: "Today", href: "/", icon: "sunrise", mobile: true },
      { label: "Devotions", href: "/devotions", icon: "devotion", mobile: true },
      { label: "Meditate", href: "/meditate", icon: "meditate", mobile: true },
    ],
  },
  {
    title: "Scripture",
    items: [
      { label: "Bible", href: "/bible", icon: "bible", mobile: true },
      { label: "Reading Plans", href: "/plans", icon: "plans" },
    ],
  },
  {
    title: "Your space",
    items: [{ label: "Journal", href: "/journal", icon: "journal", mobile: true }],
  },
];

const mobileNav = primaryNav.flatMap((group) => group.items).filter((item) => item.mobile);

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/bible") return pathname === "/bible" || pathname.startsWith("/bible/");
  if (href === "/devotions") return pathname === "/devotions" || pathname.startsWith("/devotions/");
  return pathname === href;
}

function ThemeButton({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "day" ? "Switch to night mode" : "Switch to day mode"}
      className={
        compact
          ? "icon-btn !h-10 !w-10"
          : "group flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-2.5 text-[0.78rem] font-medium text-ink-soft transition hover:border-line hover:bg-surface"
      }
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition group-hover:text-gold">
        <Icon name={theme === "day" ? "moon-stars" : "sun"} size={15} />
      </span>
      {!compact && <span>{theme === "day" ? "Night mode" : "Day mode"}</span>}
    </button>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { streak } = useStreak();

  return (
    <div className="relative min-h-dvh lg:grid lg:grid-cols-[274px_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-[color-mix(in_srgb,var(--canvas)_72%,transparent)] px-5 py-7 backdrop-blur-xl lg:flex">
        <Link href="/" className="px-2" aria-label="PENBible home">
          <Wordmark />
        </Link>

        <nav className="mt-10 flex flex-1 flex-col gap-7 overflow-y-auto pr-1 thin-scroll">
          {primaryNav.map((group) => (
            <div key={group.title}>
              <p className="eyebrow mb-3 px-3 text-[0.56rem] text-ink-faint">{group.title}</p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[0.83rem] font-medium transition ${
                        active
                          ? "bg-surface text-ink shadow-[0_18px_40px_-28px_rgba(23,61,48,0.9)]"
                          : "text-ink-soft hover:bg-surface/70 hover:text-ink"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                          active
                            ? "bg-pine/10 text-pine"
                            : "text-ink-faint group-hover:text-pine"
                        }`}
                      >
                        <Icon name={item.icon} size={17} />
                      </span>
                      <span className="flex-1">{item.label}</span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition ${
                          active ? "bg-gold" : "bg-transparent"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-7 space-y-3">
          <Link
            href="/bible#psalms:46:10"
            className="group relative block overflow-hidden rounded-[1.4rem] border border-line bg-surface-muted p-4 transition hover:border-line-strong"
          >
            <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-gold/15 blur-2xl transition group-hover:bg-gold/25" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[0.54rem] text-gold">A word to carry</span>
                <Icon name="sparkle" size={13} className="text-gold" />
              </div>
              <p className="mt-3 font-reading text-[0.86rem] italic leading-[1.75] text-ink">
                â€œBe still, and know that I am God.â€
              </p>
              <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                Psalm 46:10
              </p>
            </div>
          </Link>

          <div className="flex items-center justify-between rounded-2xl border border-line bg-surface/60 p-2.5 pl-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-soft font-display text-sm font-semibold text-pine">
                B
              </span>
              <div>
                <p className="text-[0.72rem] font-semibold text-ink">Beloved</p>
                <p className="flex items-center gap-1 text-[0.6rem] text-ink-faint">
                  <Icon name="flame" size={10} className="text-gold" />
                  {streak} day{streak === 1 ? "" : "s"} with God
                </p>
              </div>
            </div>
            <ThemeButton compact />
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-40 flex h-[68px] items-center justify-between border-b border-line bg-[color-mix(in_srgb,var(--canvas)_82%,transparent)] px-4 backdrop-blur-xl lg:hidden">
          <Link href="/" aria-label="PENBible home">
            <Wordmark compact />
          </Link>
          <div className="flex items-center gap-1.5">
            <Link href="/plans" className="icon-btn !h-10 !w-10" aria-label="Reading plans">
              <Icon name="plans" size={16} />
            </Link>
            <Link href="/bible#search" className="icon-btn !h-10 !w-10" aria-label="Search Scripture">
              <Icon name="search" size={16} />
            </Link>
            <ThemeButton compact />
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1450px] px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-14 lg:pt-9 xl:px-14">
          {children}
        </main>
      </div>

      <nav
        aria-label="Primary navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-[color-mix(in_srgb,var(--canvas)_88%,transparent)] px-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto flex max-w-md items-center justify-around">
          {mobileNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex min-w-[3.6rem] flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[0.56rem] font-medium tracking-[0.01em] transition ${
                  active ? "text-ink" : "text-ink-faint"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                    active ? "bg-pine/10 text-pine" : "text-ink-soft"
                  }`}
                >
                  <Icon name={item.icon} size={17} />
                </span>
                {item.label}
                {active && <span className="absolute -top-[7px] h-1 w-5 rounded-full bg-gold" />}
              </Link>
            );
          })}
        </div>
      </nav>

      <ToastViewport />
    </div>
  );
}

