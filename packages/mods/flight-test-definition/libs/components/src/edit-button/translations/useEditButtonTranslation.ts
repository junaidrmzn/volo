import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./editButton.de.translations.json";
import en from "./editButton.en.translations.json";

const translations = { en, de };
export const useEditButtonTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
