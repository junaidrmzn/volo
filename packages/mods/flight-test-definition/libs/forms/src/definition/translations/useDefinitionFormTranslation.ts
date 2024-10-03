import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./definitionForm.de.translations.json";
import en from "./definitionForm.en.translations.json";

const translations = { en, de };
export const useDefinitionFormTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);

export type DefinitionFormTranslationFunction = ReturnType<typeof useDefinitionFormTranslation>["t"];
