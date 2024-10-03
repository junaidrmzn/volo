import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./exportModal.de.translations.json";
import en from "./exportModal.en.translations.json";

const translations = { en, de };
export const useExportModalTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
