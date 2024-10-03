import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./generalInformationSection.de.translations.json";
import en from "./generalInformationSection.en.translations.json";

const translations = { en, de };
export const useGeneralInformationSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
