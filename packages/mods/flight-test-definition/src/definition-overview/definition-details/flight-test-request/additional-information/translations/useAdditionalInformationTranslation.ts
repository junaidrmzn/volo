import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./additionalInformation.de.translations.json";
import en from "./additionalInformation.en.translations.json";

const translations = { en, de };
export const useAdditionalInformationTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
