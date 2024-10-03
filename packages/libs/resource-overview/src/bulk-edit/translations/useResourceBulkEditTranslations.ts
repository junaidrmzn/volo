import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resourceBulkEdit.de.translations.json";
import en from "./resourceBulkEdit.en.translations.json";

const translations = { en, de };
export const useResourceBulkEditTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
