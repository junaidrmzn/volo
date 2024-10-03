import { useTranslation } from "@voloiq/i18n";
import type { VerifiedTranslations } from "@voloiq/i18n";
import de from "./testHazardAssessmentPreview.de.translations.json";
import en from "./testHazardAssessmentPreview.en.translations.json";

const translations = { en, de };
export const useTestHazardAssessmentPreviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
