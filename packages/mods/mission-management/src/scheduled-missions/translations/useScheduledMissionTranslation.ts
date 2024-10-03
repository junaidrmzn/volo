import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./scheduledMission.de.translations.json";
import en from "./scheduledMission.en.translations.json";

const translations = { en, de };
export const useScheduledMissionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
