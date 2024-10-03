import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./logAdd.de.translations.json";
import en from "./logAdd.en.translations.json";

const translations = { en, de };
export const useLogAddTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
