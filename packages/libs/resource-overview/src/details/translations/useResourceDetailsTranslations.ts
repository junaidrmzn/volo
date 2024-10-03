import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resourceDetails.de.translations.json";
import en from "./resourceDetails.en.translations.json";

const translations = { en, de };
export const useResourceDetailsTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
