import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./additionalNotesTabContent.de.translations.json";
import en from "./additionalNotesTabContent.en.translations.json";

const translations = { en, de };
export const useAdditionalNotesTabContentTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
