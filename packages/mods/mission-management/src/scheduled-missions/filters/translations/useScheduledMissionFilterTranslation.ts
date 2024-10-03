import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./scheduledMissionFilter.de.translations.json";
import en from "./scheduledMissionFilter.en.translations.json";

const translations = { en, de };
export const useScheduledMissionFilterTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
