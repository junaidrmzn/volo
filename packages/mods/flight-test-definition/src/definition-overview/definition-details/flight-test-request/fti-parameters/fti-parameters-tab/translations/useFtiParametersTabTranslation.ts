import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ftiParametersTab.de.translations.json";
import en from "./ftiParametersTab.en.translations.json";

const translations = { en, de };
export const useFtiParametersTabTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
