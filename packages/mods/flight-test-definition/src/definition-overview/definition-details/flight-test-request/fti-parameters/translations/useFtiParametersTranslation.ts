import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ftiParameters.de.translations.json";
import en from "./ftiParameters.en.translations.json";

const translations = { en, de };
export const useFtiParametersTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
