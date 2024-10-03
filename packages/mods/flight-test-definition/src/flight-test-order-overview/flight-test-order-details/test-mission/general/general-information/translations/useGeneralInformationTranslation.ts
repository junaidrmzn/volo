import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./generalInformation.de.translations.json";
import en from "./generalInformation.en.translations.json";

const translations = { en, de };
export const useGeneralInformationTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
