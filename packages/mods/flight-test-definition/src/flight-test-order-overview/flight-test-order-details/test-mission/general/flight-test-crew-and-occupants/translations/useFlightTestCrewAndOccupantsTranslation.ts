import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightTestCrewAndOccupants.de.translations.json";
import en from "./flightTestCrewAndOccupants.en.translations.json";

const translations = { en, de };
export const useFlightTestCrewAndOccupantsTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
