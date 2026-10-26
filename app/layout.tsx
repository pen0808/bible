import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Lora, Manrope } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "PENBible — A quiet place in the Word",
    template: "%s · PENBible",
  },
  description:
    "PENBible is a calm, Scripture-centered sanctuary for daily devotion, the word of the day, guided meditation, and the full Bible.",
  applicationName: "PENBible",
  keywords: [
    "PENBible",
    "Bible app",
    "daily devotion",
    "word of the day",
    "Christian meditation",
    "Scripture",
    "KJV Bible",
  ],
  manifest: `${basePath}/manifest.webmanifest`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PENBible",
  },
  icons: {
    icon: [
      { url: `${basePath}/icon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/icons/icon-192.png`, sizes: "192x192", type: "image/png" },
      { url: `${basePath}/icons/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "PENBible — A quiet place in the Word",
    description:
      "Daily devotion, a word to carry, guided stillness, and the full Bible in one calm space.",
    type: "website",
    siteName: "PENBible",
    images: [
      {
        url: `${basePath}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: "PENBible — A quiet place in the Word",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PENBible — A quiet place in the Word",
    description:
      "Daily devotion, a word to carry, guided stillness, and the full Bible in one calm space.",
    images: [`${basePath}/brand/og-image.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe5" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1713" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} ${lora.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('penbible:theme')||localStorage.getItem('selah:theme');if(t&&t!=='null'){try{var p=JSON.parse(t);t=typeof p==='string'?p:t;}catch(e){}}if(t==='night'){document.documentElement.dataset.theme='night';}}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
