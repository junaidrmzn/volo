import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./crewApi.de.translations.json";
import en from "./crewApi.en.translations.json";

const translations = { en, de };
export const useCrewApiTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);

export type ResourcesTranslationFunction = ReturnType<typeof useCrewApiTranslation>["t"];
