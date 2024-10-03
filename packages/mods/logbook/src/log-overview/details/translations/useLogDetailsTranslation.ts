import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./logDetails.de.translations.json";
import en from "./logDetails.en.translations.json";

const translations = { en, de };
export const useLogDetailsTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
