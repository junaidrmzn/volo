import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resourceSort.de.translations.json";
import en from "./resourceSort.en.translations.json";

const translations = { en, de };
export const useResourceSortTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
