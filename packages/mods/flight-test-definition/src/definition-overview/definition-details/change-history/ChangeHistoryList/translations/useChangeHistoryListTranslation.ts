import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./changeHistoryList.de.translations.json";
import en from "./changeHistoryList.en.translations.json";

const translations = { en, de };
export const useChangeHistoryListTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
