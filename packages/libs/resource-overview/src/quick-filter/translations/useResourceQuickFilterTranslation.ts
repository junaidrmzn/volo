import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resourceQuickFilter.de.translations.json";
import en from "./resourceQuickFilter.en.translations.json";

const translations = { en, de };
export const useResourceQuickFilterTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
