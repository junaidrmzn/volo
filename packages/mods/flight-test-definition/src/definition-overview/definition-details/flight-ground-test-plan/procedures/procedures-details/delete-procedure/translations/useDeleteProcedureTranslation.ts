import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./deleteProcedure.de.translations.json";
import en from "./deleteProcedure.en.translations.json";

const translations = { en, de };
export const useDeleteProcedureTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
