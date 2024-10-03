import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./weatherCard.de.translations.json";
import en from "./weatherCard.en.translations.json";

const translations = { en, de };
export const useWeatherCardTranslations = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type TranslationLabel = keyof typeof translations["en"];
