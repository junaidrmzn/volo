import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./engineeringTestProcedures.de.translations.json";
import en from "./engineeringTestProcedures.en.translations.json";

const translations = { en, de };
export const useEngineeringTestProceduresTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
