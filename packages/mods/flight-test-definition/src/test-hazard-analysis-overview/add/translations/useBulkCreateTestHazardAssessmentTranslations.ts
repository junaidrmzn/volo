import { useTranslation } from "@voloiq/i18n";
import type { VerifiedTranslations } from "@voloiq/i18n";
import de from "./bulkCreateTestHazardAssessment.de.translations.json";
import en from "./bulkCreateTestHazardAssessment.en.translations.json";

const translations = { en, de };
export const useBulkCreateTestHazardAssessmentTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
