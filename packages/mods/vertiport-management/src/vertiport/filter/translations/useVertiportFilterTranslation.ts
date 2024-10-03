import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./vertiportFilter.de.translations.json";
import en from "./vertiportFilter.en.translations.json";

const translations = { en, de };
export const useVertiportFilterTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
