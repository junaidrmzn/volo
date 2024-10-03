import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./realtimeNotificationProvider.de.translations.json";
import en from "./realtimeNotificationProvider.en.translations.json";

const translations = { en, de };
export const useRealtimeNotificationProviderTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
