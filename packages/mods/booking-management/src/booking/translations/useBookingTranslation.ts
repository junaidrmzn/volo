import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./booking.de.translations.json";
import en from "./booking.en.translations.json";

const translations = { en, de };
export const useBookingTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type BookingTranslationFunction = ReturnType<typeof useBookingTranslation>["t"];
