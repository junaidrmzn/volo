import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./manualRequirementsModal.de.translations.json";
import en from "./manualRequirementsModal.en.translations.json";

const translations = { en, de };
export const useManualRequirementsModalTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
