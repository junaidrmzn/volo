import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ScheduleItemStatus.de.translations.json";
import en from "./ScheduleItemStatus.en.translations.json";

const translations = { en, de };
export const useScheduleItemStatusTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
