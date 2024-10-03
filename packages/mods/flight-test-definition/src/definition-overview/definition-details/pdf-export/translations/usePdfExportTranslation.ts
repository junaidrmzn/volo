import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./pdfExport.de.translations.json";
import en from "./pdfExport.en.translations.json";

const translations = { en, de };
export const usePdfExportTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
