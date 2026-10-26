import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "PENBible — A quiet place in the Word",
    short_name: "PENBible",
    description:
      "Daily devotion, a word to carry, guided stillness, and the full Bible in one calm space.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4efe5",
    theme_color: "#173d30",
    orientation: "portrait",
    categories: ["books", "education", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Today's devotion",
        short_name: "Today",
        url: "/",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Open the Bible",
        short_name: "Bible",
        url: "/bible",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Your journal",
        short_name: "Journal",
        url: "/journal",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
