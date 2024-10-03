import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testPointCard.de.translations.json";
import en from "./testPointCard.en.translations.json";

const translations = { en, de };
export const useTestPointCardTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
