import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./missionError.de.translations.json";
import en from "./missionError.en.translations.json";

const translations = { en, de };
export const useMissionErrorTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);

export type MissionErrorTranslations = ReturnType<typeof useMissionErrorTranslations>;
export type MissionErrorTranslationFunction = MissionErrorTranslations["t"];
