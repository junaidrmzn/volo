import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./editTestRequestSection.de.translations.json";
import en from "./editTestRequestSection.en.translations.json";

const translations = { en, de };
export const useEditTestRequestSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
