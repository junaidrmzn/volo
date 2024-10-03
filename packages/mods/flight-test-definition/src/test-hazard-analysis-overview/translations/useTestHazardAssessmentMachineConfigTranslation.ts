import { useTranslation } from "@voloiq/i18n";
import type { VerifiedTranslations } from "@voloiq/i18n";
import de from "./testHazardAssessmentMachineConfig.de.translations.json";
import en from "./testHazardAssessmentMachineConfig.en.translations.json";

const translations = { en, de };

export const useTestHazardAssessmentMachineConfigTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
