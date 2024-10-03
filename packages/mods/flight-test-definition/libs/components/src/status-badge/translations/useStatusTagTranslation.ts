import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./StatusTag.de.translations.json";
import en from "./StatusTag.en.translations.json";

const translations = { en, de };
export const useStatusTagTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
