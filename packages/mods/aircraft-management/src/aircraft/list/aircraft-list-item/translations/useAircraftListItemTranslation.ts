import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./aircraftListItem.de.translations.json";
import en from "./aircraftListItem.en.translations.json";

const translations = { en, de };
export const useAircraftListItemTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
