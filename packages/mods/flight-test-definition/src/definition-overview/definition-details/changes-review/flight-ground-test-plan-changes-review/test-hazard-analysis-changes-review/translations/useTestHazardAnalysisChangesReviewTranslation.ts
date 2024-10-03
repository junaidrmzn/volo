import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testHazardAnalysisChangesReview.de.translations.json";
import en from "./testHazardAnalysisChangesReview.en.translations.json";

const translations = { en, de };
export const useTestHazardAnalysisChangesReviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
