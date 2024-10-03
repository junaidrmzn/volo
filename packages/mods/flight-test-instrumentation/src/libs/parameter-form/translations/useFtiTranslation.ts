import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ftiParameterForm.de.translations.json";
import en from "./ftiParameterForm.en.translations.json";

const translations = { en, de };
export const useFtiParameterFormTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
