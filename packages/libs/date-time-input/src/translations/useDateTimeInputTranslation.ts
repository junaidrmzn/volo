import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./dateTimeInput.de.translations.json";
import en from "./dateTimeInput.en.translations.json";

const translations = { en, de };
export const useDateTimeInputTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
