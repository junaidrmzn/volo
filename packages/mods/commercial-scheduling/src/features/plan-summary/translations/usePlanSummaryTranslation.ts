import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./planSummary.de.translations.json";
import en from "./planSummary.en.translations.json";

const translations = { en, de };
export const usePlanSummaryTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type PlanSummaryTranslationFunction = ReturnType<typeof usePlanSummaryTranslation>["t"];
