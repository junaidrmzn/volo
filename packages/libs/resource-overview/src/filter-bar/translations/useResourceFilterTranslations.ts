import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resourceFilter.de.translations.json";
import en from "./resourceFilter.en.translations.json";

const translations = { en, de };
export const useResourceFilterTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
