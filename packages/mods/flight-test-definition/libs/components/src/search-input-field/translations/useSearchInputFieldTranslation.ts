import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./searchInputField.de.translations.json";
import en from "./searchInputField.en.translations.json";

const translations = { en, de };
export const useSearchInputFieldTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
