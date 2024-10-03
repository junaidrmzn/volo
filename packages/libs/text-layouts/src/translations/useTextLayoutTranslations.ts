import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./textLayout.de.translations.json";
import en from "./textLayout.en.translations.json";

const translations = { en, de };
export const useTextLayoutTranslations = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
