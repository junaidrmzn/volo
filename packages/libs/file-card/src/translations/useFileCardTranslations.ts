import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./fileCard.de.translations.json";
import en from "./fileCard.en.translations.json";

const translations = { en, de };
export const useFileCardTranslations = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
