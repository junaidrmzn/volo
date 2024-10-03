import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./definitionOverview.de.translations.json";
import en from "./definitionOverview.en.translations.json";

const translations = { en, de };
export const useDefinitionOverviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
