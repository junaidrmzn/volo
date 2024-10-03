import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./PlanSummaryCustomItemStatus.de.translations.json";
import en from "./PlanSummaryCustomItemStatus.en.translations.json";

const translations = { en, de };
export const usePlanSummaryCustomItemStatusTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
