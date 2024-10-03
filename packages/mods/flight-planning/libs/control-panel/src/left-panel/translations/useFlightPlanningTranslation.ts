import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightPlanning.de.translations.json";
import en from "./flightPlanning.en.translations.json";

const translations = { en, de };
export const useFlightPlanningTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
