import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./AlertSnackbarStatus.de.translations.json";
import en from "./AlertSnackbarStatus.en.translations.json";

const translations = { en, de };
export const useAlertSnackbarTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
