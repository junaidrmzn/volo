import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resourceSection.de.translations.json";
import en from "./resourceSection.en.translations.json";

const translations = { en, de };
export const useResourceSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
