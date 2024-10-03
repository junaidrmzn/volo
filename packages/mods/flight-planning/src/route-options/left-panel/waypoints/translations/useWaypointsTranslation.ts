import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./waypoints.de.translations.json";
import en from "./waypoints.en.translations.json";

const translations = { en, de };
export const useWaypointsTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
