import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testAircraft.de.translations.json";
import en from "./testAircraft.en.translations.json";

const translations = { en, de };
export const useTestAircraftTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
