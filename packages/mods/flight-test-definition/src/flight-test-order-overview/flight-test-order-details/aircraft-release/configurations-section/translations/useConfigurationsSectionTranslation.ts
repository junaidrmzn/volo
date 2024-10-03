import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./configurationsSection.de.translations.json";
import en from "./configurationsSection.en.translations.json";

const translations = { en, de };
export const useConfigurationsSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
