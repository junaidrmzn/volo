import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./notificationButton.de.translations.json";
import en from "./notificationButton.en.translations.json";

const translations = { en, de };
export const useNotificationButtonTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
