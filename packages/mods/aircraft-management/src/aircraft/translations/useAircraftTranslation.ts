import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./aircraft.de.translations.json";
import en from "./aircraft.en.translations.json";

const translations = { en, de };
export const useAircraftTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);

export type AircraftTranslationFunction = ReturnType<typeof useAircraftTranslation>["t"];
