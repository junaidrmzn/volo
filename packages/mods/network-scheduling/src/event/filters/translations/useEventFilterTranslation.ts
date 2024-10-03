import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./eventFilter.de.translations.json";
import en from "./eventFilter.en.translations.json";

const translations = { en, de };
export const useEventFilterTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
