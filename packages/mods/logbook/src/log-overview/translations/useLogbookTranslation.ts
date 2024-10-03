import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./logbook.de.translations.json";
import en from "./logbook.en.translations.json";

const translations = { en, de };
export const useLogbookTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
