import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./parameterOverview.de.translations.json";
import en from "./parameterOverview.en.translations.json";

const translations = { en, de };
export const useParameterOverviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
