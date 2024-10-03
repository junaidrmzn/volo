import { VerifiedTranslations, useTranslation } from "@voloiq/i18n";
import de from "./Plan.de.translations.json";
import en from "./Plan.en.translations.json";

const translations = { en, de };
export const usePlanTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type PlanTranslationFunction = ReturnType<typeof usePlanTranslation>["t"];
