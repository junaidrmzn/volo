import { VerifiedTranslations, useTranslation } from "@voloiq/i18n";
import de from "./EarlyAccess.de.translations.json";
import en from "./EarlyAccess.en.translations.json";

const translations = { en, de };
export const useEarlyAccessTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type EarlyAccessTranslationFunction = ReturnType<typeof useEarlyAccessTranslation>["t"];
