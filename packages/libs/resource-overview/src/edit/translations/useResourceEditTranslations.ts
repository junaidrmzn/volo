import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resourceEdit.de.translations.json";
import en from "./resourceEdit.en.translations.json";

const translations = { en, de };
export const useResourceEditTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
