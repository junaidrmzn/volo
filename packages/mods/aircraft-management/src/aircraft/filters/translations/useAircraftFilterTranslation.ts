import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./aircraftFilter.de.translations.json";
import en from "./aircraftFilter.en.translations.json";

const translations = { en, de };
export const useAircraftFilterTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
