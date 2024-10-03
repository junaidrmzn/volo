import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./notamsTab.de.translations.json";
import en from "./notamsTab.en.translations.json";

const translations = { en, de };
export const useNotamsTabTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
