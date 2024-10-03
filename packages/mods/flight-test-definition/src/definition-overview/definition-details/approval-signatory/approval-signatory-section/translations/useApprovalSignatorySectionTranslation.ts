import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./approvalSignatorySection.de.translations.json";
import en from "./approvalSignatorySection.en.translations.json";

const translations = { en, de };
export const useApprovalSignatorySectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
