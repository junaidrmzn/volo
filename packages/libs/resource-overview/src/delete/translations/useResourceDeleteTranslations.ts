import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resourceDelete.de.translations.json";
import en from "./resourceDelete.en.translations.json";

const translations = { en, de };
export const useResourceDeleteTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
