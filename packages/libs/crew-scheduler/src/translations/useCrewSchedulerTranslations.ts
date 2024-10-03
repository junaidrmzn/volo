import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./crewScheduler.de.translations.json";
import en from "./crewScheduler.en.translations.json";

const translations = { en, de };
export const useCrewSchedulerTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
