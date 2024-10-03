export const languages = ["de", "en"] as const;
export type Language = typeof languages[number];

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export const isLanguage = (language: string): language is Language => languages.includes(language as Language);
