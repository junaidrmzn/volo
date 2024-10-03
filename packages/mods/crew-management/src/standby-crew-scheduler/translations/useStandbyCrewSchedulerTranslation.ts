import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./standbyCrewScheduler.de.translations.json";
import en from "./standbyCrewScheduler.en.translations.json";

const translations = { en, de };
export const useStandbyCrewSchedulerTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
