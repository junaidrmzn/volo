import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./approvalSignatoryChangesReview.de.translations.json";
import en from "./approvalSignatoryChangesReview.en.translations.json";

const translations = { en, de };
export const useApprovalSignatoryChangesReviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
