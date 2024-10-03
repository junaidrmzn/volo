import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./safetyReviewBoardSectionModal.de.translations.json";
import en from "./safetyReviewBoardSectionModal.en.translations.json";

const translations = { en, de };
export const useSafetyReviewBoardSectionModalTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
