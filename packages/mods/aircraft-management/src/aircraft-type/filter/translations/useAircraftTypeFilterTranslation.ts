import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./aircraftTypeFilter.de.translations.json";
import en from "./aircraftTypeFilter.en.translations.json";

const translations = { en, de };
export const useAircraftTypeFilterTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
