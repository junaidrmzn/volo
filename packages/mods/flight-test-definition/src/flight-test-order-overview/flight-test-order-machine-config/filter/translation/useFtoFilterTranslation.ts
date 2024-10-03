import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ftoFilter.de.translations.json";
import en from "./ftoFilter.en.translations.json";

const translations = { en, de };
export const useFtoFilterTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
