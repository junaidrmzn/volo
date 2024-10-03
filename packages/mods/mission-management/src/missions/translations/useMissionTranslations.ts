import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./mission.de.translations.json";
import en from "./mission.en.translations.json";

const translations = { en, de };
export const useMissionTranslations = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);

export type MissionTranslations = ReturnType<typeof useMissionTranslations>;
export type MissionTranslationFunction = MissionTranslations["t"];
