import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./notificationPopover.de.translations.json";
import en from "./notificationPopover.en.translations.json";

const translations = { en, de };
export const useNotificationPopoverTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type NotificationPopoverTranslationFunction = ReturnType<typeof useNotificationPopoverTranslation>["t"];
