import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testPointSection.de.translations.json";
import en from "./testPointSection.en.translations.json";

const translations = { en, de };
export const useTestPointSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
