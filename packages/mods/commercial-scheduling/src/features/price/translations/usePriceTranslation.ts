import { VerifiedTranslations, useTranslation } from "@voloiq/i18n";
import de from "./Price.de.translations.json";
import en from "./Price.en.translations.json";

const translations = { de, en };

export const usePriceTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type PriceTranslationFunction = ReturnType<typeof usePriceTranslation>["t"];
