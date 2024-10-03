import { VerifiedTranslations, useTranslation } from "@voloiq/i18n";
import de from "./ScheduleItem.de.translations.json";
import en from "./ScheduleItem.en.translations.json";

const translations = { en, de };
export const useScheduleItemTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type ScheduleItemTranslationFunction = ReturnType<typeof useScheduleItemTranslation>["t"];
