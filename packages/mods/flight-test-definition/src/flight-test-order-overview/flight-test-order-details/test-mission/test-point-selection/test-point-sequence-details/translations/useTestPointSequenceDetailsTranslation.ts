import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testPointSequenceDetails.de.translations.json";
import en from "./testPointSequenceDetails.en.translations.json";

const translations = { en, de };
export const useTestPointSequenceDetailsTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
