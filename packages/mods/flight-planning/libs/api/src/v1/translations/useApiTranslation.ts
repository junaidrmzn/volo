import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./api.de.translations.json";
import en from "./api.en.translations.json";

const translations = { en, de };
export const useApiTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
