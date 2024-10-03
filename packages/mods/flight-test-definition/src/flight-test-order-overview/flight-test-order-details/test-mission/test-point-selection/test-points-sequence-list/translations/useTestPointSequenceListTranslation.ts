import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testPointSequenceList.de.translations.json";
import en from "./testPointSequenceList.en.translations.json";

const translations = { en, de };
export const useTestPointSequenceListTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
