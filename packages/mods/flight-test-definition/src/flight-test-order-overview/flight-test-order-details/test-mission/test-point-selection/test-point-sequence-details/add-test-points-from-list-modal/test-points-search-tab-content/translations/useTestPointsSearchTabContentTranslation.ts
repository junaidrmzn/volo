import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testPointsSearchTabContent.de.translations.json";
import en from "./testPointsSearchTabContent.en.translations.json";

const translations = { en, de };
export const useTestPointsSearchTabContentTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
