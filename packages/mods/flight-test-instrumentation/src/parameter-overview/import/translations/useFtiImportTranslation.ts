import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ftiImport.de.translations.json";
import en from "./ftiImport.en.translations.json";

const translations = { en, de };
export const useFtiImportTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
