import type { MetadataRoute } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: `${basePath}/`,
    name: "PENBible — A quiet place in the Word",
    short_name: "PENBible",
    description:
      "Daily devotion, a word to carry, guided stillness, and the full Bible in one calm space.",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#f4efe5",
    theme_color: "#173d30",
    orientation: "portrait",
    categories: ["books", "education", "lifestyle"],
    icons: [
      {
        src: `${basePath}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-maskable-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: `${basePath}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Today's devotion",
        short_name: "Today",
        url: `${basePath}/`,
        icons: [{ src: `${basePath}/icons/icon-192.png`, sizes: "192x192" }],
      },
      {
        name: "Open the Bible",
        short_name: "Bible",
        url: `${basePath}/bible/`,
        icons: [{ src: `${basePath}/icons/icon-192.png`, sizes: "192x192" }],
      },
      {
        name: "Your journal",
        short_name: "Journal",
        url: `${basePath}/journal/`,
        icons: [{ src: `${basePath}/icons/icon-192.png`, sizes: "192x192" }],
      },
    ],
  };
}
