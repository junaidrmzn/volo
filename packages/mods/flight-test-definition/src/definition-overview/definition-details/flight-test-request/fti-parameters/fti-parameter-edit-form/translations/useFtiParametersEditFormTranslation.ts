import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ftiParametersEditForm.de.translations.json";
import en from "./ftiParametersEditForm.en.translations.json";

const translations = { en, de };
export const useFtiParametersEditFormTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
