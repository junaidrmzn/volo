import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resourceList.de.translations.json";
import en from "./resourceList.en.translations.json";

const translations = { en, de };
export const useResourceListTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
