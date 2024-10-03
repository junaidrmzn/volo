import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resourceAdd.de.translations.json";
import en from "./resourceAdd.en.translations.json";

const translations = { en, de };
export const useResourceAddTranslations = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
