import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./definitionStatusTag.de.translations.json";
import en from "./definitionStatusTag.en.translations.json";

const translations = { en, de };
export const useDefinitionStatusTagTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
