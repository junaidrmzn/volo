import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightPlanTab.de.translations.json";
import en from "./flightPlanTab.en.translations.json";

const translations = { en, de };
export const useFlightPlanTabTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
