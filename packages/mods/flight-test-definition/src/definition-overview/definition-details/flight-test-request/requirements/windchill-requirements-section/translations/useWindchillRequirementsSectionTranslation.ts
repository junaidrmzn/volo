import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./windchillRequirementsSection.de.translations.json";
import en from "./windchillRequirementsSection.en.translations.json";

const translations = { en, de };
export const useWindchillRequirementsSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
