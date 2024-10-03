import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./voloiq.de.translations.json";
import en from "./voloiq.en.translations.json";

const translations = { en, de };
export const useVoloIqTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
