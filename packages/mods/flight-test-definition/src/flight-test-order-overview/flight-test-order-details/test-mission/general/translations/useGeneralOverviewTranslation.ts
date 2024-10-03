import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./generalOverview.de.translations.json";
import en from "./generalOverview.en.translations.json";

const translations = { en, de };
export const useGeneralOverviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
