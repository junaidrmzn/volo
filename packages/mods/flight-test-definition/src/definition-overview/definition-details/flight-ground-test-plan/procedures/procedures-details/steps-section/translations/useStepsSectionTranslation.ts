import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./stepsSection.de.translations.json";
import en from "./stepsSection.en.translations.json";

const translations = { en, de };
export const useStepsSectionTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
