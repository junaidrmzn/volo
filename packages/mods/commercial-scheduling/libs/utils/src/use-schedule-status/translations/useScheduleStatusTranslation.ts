import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ScheduleStatus.de.translations.json";
import en from "./ScheduleStatus.en.translations.json";

const translations = { en, de };
export const useScheduleStatusTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
