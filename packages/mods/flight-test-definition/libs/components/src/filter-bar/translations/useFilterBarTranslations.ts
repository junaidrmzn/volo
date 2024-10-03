import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./filterBar.de.translations.json";
import en from "./filterBar.en.translations.json";

const translations = { en, de };
export const useFilterBarTranslations = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
