import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./anchorNavBar.de.translations.json";
import en from "./anchorNavBar.en.translations.json";

const translations = { en, de };
export const useAnchorNavBarTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
