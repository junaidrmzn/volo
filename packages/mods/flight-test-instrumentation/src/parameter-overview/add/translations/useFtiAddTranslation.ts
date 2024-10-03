import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ftiAdd.de.translations.json";
import en from "./ftiAdd.en.translations.json";

const translations = { en, de };
export const useFtiAddTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
