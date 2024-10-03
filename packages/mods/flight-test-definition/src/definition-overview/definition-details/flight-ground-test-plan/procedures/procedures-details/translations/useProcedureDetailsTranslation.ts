import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./procedureDetails.de.translations.json";
import en from "./procedureDetails.en.translations.json";

const translations = { en, de };
export const useProcedureDetailsTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
