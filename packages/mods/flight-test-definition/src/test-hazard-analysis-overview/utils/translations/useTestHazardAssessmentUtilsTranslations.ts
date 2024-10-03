import { useTranslation } from "@voloiq/i18n";
import type { VerifiedTranslations } from "@voloiq/i18n";
import de from "./testHazardAssessmentUtils.de.translations.json";
import en from "./testHazardAssessmentUtils.en.translations.json";

const translations = { en, de };

export const useTestHazardAssessmentUtilsTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
