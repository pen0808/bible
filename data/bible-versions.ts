export type BibleVersion = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  description: string;
  language: string;
  publicDomain: boolean;
};

export const bibleVersions: BibleVersion[] = [
  {
    id: "kjv",
    code: "KJV",
    name: "King James Version",
    shortName: "KJV",
    description: "Traditional, poetic, widely beloved",
    language: "English",
    publicDomain: true,
  },
  {
    id: "gnb",
    code: "GNB",
    name: "Good News Bible",
    shortName: "GNB",
    description: "Clear, contemporary English for easy reading",
    language: "English",
    publicDomain: false,
  },
  {
    id: "niv",
    code: "NIV",
    name: "New International Version",
    shortName: "NIV",
    description: "Balance of accuracy and readability",
    language: "English",
    publicDomain: false,
  },
  {
    id: "esv",
    code: "ESV",
    name: "English Standard Version",
    shortName: "ESV",
    description: "Word-for-word accuracy with literary beauty",
    language: "English",
    publicDomain: false,
  },
  {
    id: "nlt",
    code: "NLT",
    name: "New Living Translation",
    shortName: "NLT",
    description: "Thought-for-thought, highly readable",
    language: "English",
    publicDomain: false,
  },
];

export function getBibleVersionById(id: string) {
  return bibleVersions.find((version) => version.id === id) ?? bibleVersions[0];
}
