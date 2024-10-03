import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./actionButtons.de.translations.json";
import en from "./actionButtons.en.translations.json";

const translations = { en, de };
export const useActionButtonsTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
