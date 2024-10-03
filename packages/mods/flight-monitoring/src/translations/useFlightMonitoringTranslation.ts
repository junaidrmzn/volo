import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightMonitoring.de.translations.json";
import en from "./flightMonitoring.en.translations.json";

const translations = { en, de };
export const useFlightMonitoringTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
