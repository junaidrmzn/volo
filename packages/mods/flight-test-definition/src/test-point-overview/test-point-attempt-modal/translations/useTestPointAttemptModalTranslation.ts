import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testPointAttemptModalTranslation.de.translations.json";
import en from "./testPointAttemptModalTranslation.en.translations.json";

const translations = { en, de };
export const useTestPointAttemptModalTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
