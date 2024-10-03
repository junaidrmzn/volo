import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testPointsTabContent.de.translations.json";
import en from "./testPointsTabContent.en.translations.json";

const translations = { en, de };
export const useTestPointsTabContentTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
