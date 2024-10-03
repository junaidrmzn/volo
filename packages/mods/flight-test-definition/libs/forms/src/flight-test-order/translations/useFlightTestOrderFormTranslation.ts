import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightTestOrderForm.de.translations.json";
import en from "./flightTestOrderForm.en.translations.json";

const translations = { en, de };
export const useFlightTestOrderFormTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);

export type FlightTestOrderFormTranslationFunction = ReturnType<typeof useFlightTestOrderFormTranslation>["t"];
