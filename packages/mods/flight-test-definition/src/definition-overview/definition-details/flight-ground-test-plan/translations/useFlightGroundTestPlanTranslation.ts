import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightGroundTestPlan.de.translations.json";
import en from "./flightGroundTestPlan.en.translations.json";

const translations = { en, de };
export const useFlightGroundTestPlanTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
