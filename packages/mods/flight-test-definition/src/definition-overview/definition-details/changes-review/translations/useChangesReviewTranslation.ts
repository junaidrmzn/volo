import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./changesReview.de.translations.json";
import en from "./changesReview.en.translations.json";

const translations = { en, de };
export const useChangesReviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
