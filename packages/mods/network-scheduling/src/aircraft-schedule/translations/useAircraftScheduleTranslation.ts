import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./aircraftSchedule.de.translations.json";
import en from "./aircraftSchedule.en.translations.json";

const translations = { en, de };
export const useAircraftScheduleTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
