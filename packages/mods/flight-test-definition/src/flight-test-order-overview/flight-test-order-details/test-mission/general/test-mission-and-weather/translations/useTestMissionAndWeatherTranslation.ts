import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testMissionAndWeather.de.translations.json";
import en from "./testMissionAndWeather.en.translations.json";

const translations = { en, de };
export const useTestMissionAndWeatherTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
