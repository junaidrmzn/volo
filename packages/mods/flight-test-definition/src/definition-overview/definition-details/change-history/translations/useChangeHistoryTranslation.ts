import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./changeHistory.de.translations.json";
import en from "./changeHistory.en.translations.json";

const translations = { en, de };
export const useChangeHistoryTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
