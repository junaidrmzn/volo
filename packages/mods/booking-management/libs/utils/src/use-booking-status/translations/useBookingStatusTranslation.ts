import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./bookingStatus.de.translations.json";
import en from "./bookingStatus.en.translations.json";

const translations = { en, de };
export const useBookingStatusTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
