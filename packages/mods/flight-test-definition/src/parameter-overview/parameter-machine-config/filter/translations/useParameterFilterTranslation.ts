import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./parameterFilter.de.translations.json";
import en from "./parameterFilter.en.translations.json";

const translations = { en, de };
export const useParameterFilterTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
