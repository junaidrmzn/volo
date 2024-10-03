import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testPointAttemptTable.de.translations.json";
import en from "./testPointAttemptTable.en.translations.json";

const translations = { en, de };
export const useTestPointAttemptTableTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
