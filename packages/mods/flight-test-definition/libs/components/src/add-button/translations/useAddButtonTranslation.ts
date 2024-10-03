import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./addButton.de.translations.json";
import en from "./addButton.en.translations.json";

const translations = { en, de };
export const useAddButtonTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
