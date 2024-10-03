import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./procedureIdentifier.de.translations.json";
import en from "./procedureIdentifier.en.translations.json";

const translations = { en, de };
export const useProcedureIdentifierTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
