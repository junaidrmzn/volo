import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./backToTopButton.de.translations.json";
import en from "./backToTopButton.en.translations.json";

const translations = { en, de };
export const useBackToTopButtonTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
