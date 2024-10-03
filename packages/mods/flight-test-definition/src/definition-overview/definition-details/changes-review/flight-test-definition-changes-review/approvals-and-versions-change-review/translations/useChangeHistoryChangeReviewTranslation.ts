import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./changeHistoryChangesReview.de.translations.json";
import en from "./changeHistoryChangesReview.en.translations.json";

const translations = { en, de };

export const useChangeHistoryChangeReviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
