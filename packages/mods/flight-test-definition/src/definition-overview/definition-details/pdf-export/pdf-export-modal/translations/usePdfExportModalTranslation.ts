import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./pdfExportModal.de.translations.json";
import en from "./pdfExportModal.en.translations.json";

const translations = { en, de };
export const usePdfExportModalTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
