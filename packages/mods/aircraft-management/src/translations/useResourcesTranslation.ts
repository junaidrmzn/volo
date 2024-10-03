import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resources.de.translations.json";
import en from "./resources.en.translations.json";

const translations = { en, de };
export const useResourcesTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);

export type ResourcesTranslationFunction = ReturnType<typeof useResourcesTranslation>["t"];
