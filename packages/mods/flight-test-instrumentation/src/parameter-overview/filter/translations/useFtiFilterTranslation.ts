import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ftiFilter.de.translations.json";
import en from "./ftiFilter.en.translations.json";

const translations = { en, de };
export const useFtiFilterTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
