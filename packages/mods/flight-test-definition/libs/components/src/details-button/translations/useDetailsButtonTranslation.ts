import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./detailsButton.de.translations.json";
import en from "./detailsButton.en.translations.json";

const translations = { en, de };
export const useDetailsButtonTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
