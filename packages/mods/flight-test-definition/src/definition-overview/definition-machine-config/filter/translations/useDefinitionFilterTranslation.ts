import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./definitionFilter.de.translations.json";
import en from "./definitionFilter.en.translations.json";

const translations = { en, de };
export const useDefinitionFilterTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
