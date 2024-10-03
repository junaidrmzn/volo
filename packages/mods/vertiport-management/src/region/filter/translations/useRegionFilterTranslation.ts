import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./regionFilter.de.translations.json";
import en from "./regionFilter.en.translations.json";

const translations = { en, de };
export const useRegionFilterTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
