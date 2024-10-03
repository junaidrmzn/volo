import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./updateStatusModal.de.translations.json";
import en from "./updateStatusModal.en.translations.json";

const translations = { en, de };
export const useUpdateStatusModalTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
