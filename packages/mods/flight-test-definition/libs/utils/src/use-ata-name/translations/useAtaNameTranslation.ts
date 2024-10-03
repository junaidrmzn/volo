import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ataName.de.translations.json";
import en from "./ataName.en.translations.json";

const translations = { en, de };
export const useAtaNameTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);

export type TranslationKey = keyof typeof en;
export const isTranslationKey = (key: string): key is TranslationKey => Object.keys(en).includes(key);
