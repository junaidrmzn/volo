import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./aircraftConfiguration.de.translations.json";
import en from "./aircraftConfiguration.en.translations.json";

const translations = { en, de };
export const useAircraftConfigurationTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
