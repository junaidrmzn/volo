import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./safetyReviewBoardSection.de.translations.json";
import en from "./safetyReviewBoardSection.en.translations.json";

const translations = { en, de };
export const useSafetyReviewBoardSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
