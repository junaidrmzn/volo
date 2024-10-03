import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./safetyReviewComments.de.translations.json";
import en from "./safetyReviewComments.en.translations.json";

const translations = { en, de };
export const useSafetyReviewCommentsTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
