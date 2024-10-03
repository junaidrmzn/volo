import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./editParameter.de.translations.json";
import en from "./editParameter.en.translations.json";

const translations = { en, de };
export const useEditParameterTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);

export type EditParameterTranslationFunction = ReturnType<typeof useEditParameterTranslation>["t"];
