import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./procedureChangesReview.de.translations.json";
import en from "./procedureChangesReview.en.translations.json";

const translations = { en, de };
export const useProcedureChangesReviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
