import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "home"
  | "bible"
  | "devotion"
  | "meditate"
  | "journal"
  | "plans"
  | "search"
  | "sun"
  | "moon"
  | "play"
  | "pause"
  | "arrow-right"
  | "arrow-left"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "volume"
  | "volume-off"
  | "copy"
  | "heart"
  | "bookmark"
  | "menu"
  | "close"
  | "check"
  | "clock"
  | "flame"
  | "focus"
  | "share"
  | "quote"
  | "pen"
  | "trash"
  | "plus"
  | "settings"
  | "send"
  | "wind"
  | "music"
  | "type"
  | "grid"
  | "list"
  | "sparkle"
  | "sunrise"
  | "refresh"
  | "compass"
  | "coffee"
  | "moon-stars"
  | "download";

const paths: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5.5 9v10.5h13V9" />
      <path d="M9.5 19.5v-5.5h5v5.5" />
    </>
  ),
  bible: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v18H6.5A2.5 2.5 0 0 1 4 18.5z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v18h4.5a2.5 2.5 0 0 0 2.5-2.5z" />
      <path d="M7.4 8.5h.9M16 8.5h.9M7.4 12h.9M16 12h.9" />
    </>
  ),
  devotion: (
    <>
      <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z" />
      <path d="M12 8.35V5M9.8 6.1 12 3.9l2.2 2.2" />
    </>
  ),
  meditate: (
    <>
      <circle cx="12" cy="7.2" r="2.4" />
      <path d="M6.5 21c.3-3.2 2.4-5.1 5.5-5.1s5.2 1.9 5.5 5.1" />
      <path d="M4 14.4c2.4.3 4.2 1.5 5.3 3.4M20 14.4c-2.4.3-4.2 1.5-5.3 3.4" />
      <path d="M3.5 10.3c1.6-3 3.7-4.5 6.4-4.5M20.5 10.3c-1.6-3-3.7-4.5-6.4-4.5" />
    </>
  ),
  journal: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M8 3v18M11.5 8h5M11.5 12h5M11.5 16h3" />
    </>
  ),
  plans: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2.5" />
      <path d="M8 3v4M16 3v4M4 10h16" />
      <path d="m8.5 15 2 2 4.5-4.5" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.5 15.5 4.5 4.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </>
  ),
  moon: <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.2 8.2 0 1 0 20 14.2Z" />,
  "moon-stars": (
    <>
      <path d="M18 14.2A6.7 6.7 0 0 1 9.8 6a6.7 6.7 0 1 0 8.2 8.2Z" />
      <path d="M17 3v3M15.5 4.5h3M20 8v2M19 9h2" />
    </>
  ),
  play: <path d="m9 6.5 8 5.5-8 5.5z" />,
  pause: (
    <>
      <path d="M8.5 6v12M15.5 6v12" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </>
  ),
  "arrow-left": (
    <>
      <path d="M20 12H4" />
      <path d="m10 6-6 6 6 6" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-left": <path d="m14.5 5-7 7 7 7" />,
  "chevron-right": <path d="m9.5 5 7 7-7 7" />,
  volume: (
    <>
      <path d="M4 9.5v5h3.5l4.5 4v-13l-4.5 4H4Z" />
      <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" />
    </>
  ),
  "volume-off": (
    <>
      <path d="M4 9.5v5h3.5l4.5 4v-13l-4.5 4H4Z" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="11" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2" />
    </>
  ),
  heart: <path d="M12 20.5S4.5 16.2 4.5 10.4A4 4 0 0 1 12 7.9a4 4 0 0 1 7.5 2.5c0 5.8-7.5 10.1-7.5 10.1Z" />,
  bookmark: <path d="M6.5 4.5A1.5 1.5 0 0 1 8 3h8a1.5 1.5 0 0 1 1.5 1.5V21L12 17.3 6.5 21z" />,
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.3l3.5 2" />
    </>
  ),
  flame: <path d="M13.5 21c-4 0-6.5-2.3-6.5-5.4 0-2.3 1.4-4 2.7-5.5.9-1 1.5-2 1.6-3.4 2.4 1 4.5 3 4.5 5.5 0 .8-.2 1.5-.5 2.2.8-.2 1.4-.7 1.9-1.4 1 1 1.3 2 1.3 3.1 0 3-2.2 4.9-5 4.9Z" />,
  focus: (
    <>
      <path d="M4 9V5.5A1.5 1.5 0 0 1 5.5 4H9M15 4h3.5A1.5 1.5 0 0 1 20 5.5V9M20 15v3.5a1.5 1.5 0 0 1-1.5 1.5H15M9 20H5.5A1.5 1.5 0 0 1 4 18.5V15" />
    </>
  ),
  share: (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="m8.3 10.8 7.4-3.6M8.3 13.2l7.4 3.6" />
    </>
  ),
  quote: (
    <>
      <path d="M9.5 7H5.8A1.8 1.8 0 0 0 4 8.8v4.4A1.8 1.8 0 0 0 5.8 15h2.4c0 2-1.1 3.3-3 4M20 7h-3.7a1.8 1.8 0 0 0-1.8 1.8v4.4a1.8 1.8 0 0 0 1.8 1.8h2.4c0 2-1.1 3.3-3 4" />
    </>
  ),
  pen: (
    <>
      <path d="m14.5 5.5 4 4M4 20l1.2-5.2L16.8 3.2a1.7 1.7 0 0 1 2.4 0l1.6 1.6a1.7 1.7 0 0 1 0 2.4L9.2 18.8z" />
      <path d="M9.2 18.8 5.2 14.8" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9 7V4.8A.8.8 0 0 1 9.8 4h4.4a.8.8 0 0 1 .8.8V7M6.5 7l.8 12.2a1.8 1.8 0 0 0 1.8 1.8h5.8a1.8 1.8 0 0 0 1.8-1.8L17.5 7" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2.8 2.8-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1.1 1.7V21h-4v-.2a1.8 1.8 0 0 0-1.1-1.7 1.8 1.8 0 0 0-2 .4l-.1.1-2.8-2.8.1-.1a1.8 1.8 0 0 0 .4-2 1.8 1.8 0 0 0-1.7-1.1H3v-4h.2a1.8 1.8 0 0 0 1.7-1.1 1.8 1.8 0 0 0-.4-2l-.1-.1 2.8-2.8.1.1a1.8 1.8 0 0 0 2 .4 1.8 1.8 0 0 0 1.1-1.7V3h4v.2a1.8 1.8 0 0 0 1.1 1.7 1.8 1.8 0 0 0 2-.4l.1-.1 2.8 2.8-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.7 1.1h.2v4h-.2a1.8 1.8 0 0 0-1.7 1.1Z" />
    </>
  ),
  send: (
    <>
      <path d="m21 3-7.5 18-3.2-7.3L3 10.5z" />
      <path d="M10.3 13.7 21 3" />
    </>
  ),
  wind: (
    <>
      <path d="M3 8h10.5a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7a2.5 2.5 0 1 1-2.5 2.5" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </>
  ),
  type: (
    <>
      <path d="M4 6V4h16v2M12 4v16M8 20h8" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </>
  ),
  list: (
    <>
      <path d="M9 6h12M9 12h12M9 18h12" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3c.5 4.7 2.3 6.5 7 7-4.7.5-6.5 2.3-7 7-.5-4.7-2.3-6.5-7-7 4.7-.5 6.5-2.3 7-7Z" />
      <path d="M19 16.5c.2 1.9.9 2.6 2.8 2.8-1.9.2-2.6.9-2.8 2.8-.2-1.9-.9-2.6-2.8-2.8 1.9-.2 2.6-.9 2.8-2.8Z" />
    </>
  ),
  sunrise: (
    <>
      <path d="M4 18h16M6 18a6 6 0 0 1 12 0M12 3v3M4.9 7.9l2.1 2.1M19.1 7.9 17 10M2 22h20" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.8-4L3 10" />
      <path d="M3 5v5h5M4 13a8 8 0 0 0 14.8 4L21 14" />
      <path d="M21 19v-5h-5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
      <path d="M17 9h2a3 3 0 0 1 0 6h-2M8 3v2M12 3v2" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12M7 10l5 5 5-5" />
      <path d="M4 19h16" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  strokeWidth?: number;
};

export function Icon({ name, size = 20, strokeWidth = 1.6, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
