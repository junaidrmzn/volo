import { useTranslation } from "@voloiq/i18n";
import type { VerifiedTranslations } from "@voloiq/i18n";
import de from "./testHazardAssessmentList.de.translations.json";
import en from "./testHazardAssessmentList.en.translations.json";

const translations = { en, de };

export const useTestHazardAssessmentListTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
