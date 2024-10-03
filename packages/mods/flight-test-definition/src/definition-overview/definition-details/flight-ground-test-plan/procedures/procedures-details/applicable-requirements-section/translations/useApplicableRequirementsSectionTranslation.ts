import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./applicableRequirementsSection.de.translations.json";
import en from "./applicableRequirementsSection.en.translations.json";

const translations = { en, de };
export const useApplicableRequirementsSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
