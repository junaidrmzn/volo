import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./addTestPointsFromListModal.de.translations.json";
import en from "./addTestPointsFromListModal.en.translations.json";

const translations = { en, de };
export const useAddTestPointsFromListModalTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
