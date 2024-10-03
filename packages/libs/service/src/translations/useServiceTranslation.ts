import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./service.de.translations.json";
import en from "./service.en.translations.json";

const translations = { en, de };
export const useServiceTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);

export type ServiceTranslationFunction = ReturnType<typeof useServiceTranslation>["t"];
