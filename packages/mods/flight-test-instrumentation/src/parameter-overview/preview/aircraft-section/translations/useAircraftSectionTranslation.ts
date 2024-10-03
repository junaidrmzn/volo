import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./aircraftSection.de.translations.json";
import en from "./aircraftSection.en.translations.json";

const translations = { en, de };
export const useAircraftSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
