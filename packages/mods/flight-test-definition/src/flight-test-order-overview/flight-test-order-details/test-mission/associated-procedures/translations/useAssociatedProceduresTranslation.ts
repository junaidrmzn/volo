import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./associatedProcedures.de.translations.json";
import en from "./associatedProcedures.en.translations.json";

const translations = { en, de };
export const useAssociatedProceduresTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
