import corpus from "../../../content/kitab-al-ghaybah/ahadees.json";

export type Hadith = {
  id: string;
  label: string;
  quote: string;
  ref: string;
  body: string;
  themes?: string[];
};

export type HadithCorpus = {
  source: string;
  note?: string;
  narrations: Hadith[];
};

export const hadithCorpus = corpus as HadithCorpus;

export function getAllHadiths(): Hadith[] {
  return hadithCorpus.narrations;
}

export function getHadithById(id: string): Hadith | undefined {
  return hadithCorpus.narrations.find((n) => n.id === id);
}

export function getHadithIds(): string[] {
  return hadithCorpus.narrations.map((n) => n.id);
}
