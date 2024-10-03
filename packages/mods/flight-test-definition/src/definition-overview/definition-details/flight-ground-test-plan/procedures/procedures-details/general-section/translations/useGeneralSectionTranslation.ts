import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./generalSection.de.translations.json";
import en from "./generalSection.en.translations.json";

const translations = { en, de };
export const useGeneralSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
