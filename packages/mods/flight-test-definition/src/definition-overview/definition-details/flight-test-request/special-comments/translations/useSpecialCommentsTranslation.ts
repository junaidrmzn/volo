import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./specialComments.de.translations.json";
import en from "./specialComments.en.translations.json";

const translations = { en, de };
export const useSpecialCommentsTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
