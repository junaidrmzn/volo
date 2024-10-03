import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./addParameter.de.translations.json";
import en from "./addParameter.en.translations.json";

const translations = { en, de };
export const useAddParameterTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);

export type AddParameterTranslationFunction = ReturnType<typeof useAddParameterTranslation>["t"];
