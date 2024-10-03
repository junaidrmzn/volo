import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./deleteDefinition.de.translations.json";
import en from "./deleteDefinition.en.translations.json";

const translations = { en, de };
export const useDeleteDefinitionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
