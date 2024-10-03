import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightTestCrewAndOccupantsModal.de.translations.json";
import en from "./flightTestCrewAndOccupantsModal.en.translations.json";

const translations = { en, de };
export const useFlightTestCrewAndOccupantsModalTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
