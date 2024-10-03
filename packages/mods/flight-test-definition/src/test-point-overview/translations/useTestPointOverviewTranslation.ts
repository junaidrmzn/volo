import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testPointOverview.de.translations.json";
import en from "./testPointOverview.en.translations.json";

const translations = { en, de };
export const useTestPointOverviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
