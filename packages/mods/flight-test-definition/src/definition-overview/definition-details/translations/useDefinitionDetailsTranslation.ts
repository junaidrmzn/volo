import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./definitionDetails.de.translations.json";
import en from "./definitionDetails.en.translations.json";

const translations = { en, de };
export const useDefinitionDetailsTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
