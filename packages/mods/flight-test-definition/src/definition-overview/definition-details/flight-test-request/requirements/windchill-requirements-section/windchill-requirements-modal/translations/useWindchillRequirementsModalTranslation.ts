import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./windchillRequirementsModal.de.translations.json";
import en from "./windchillRequirementsModal.en.translations.json";

const translations = { en, de };
export const useWindchillRequirementsModalTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
