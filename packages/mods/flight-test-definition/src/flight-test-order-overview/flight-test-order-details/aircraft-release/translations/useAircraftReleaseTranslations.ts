import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./aircraftRelease.de.translations.json";
import en from "./aircraftRelease.en.translations.json";

const translations = { en, de };
export const useAircraftReleaseTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
