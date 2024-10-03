import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testMission.de.translations.json";
import en from "./testMission.en.translations.json";

const translations = { en, de };
export const useTestMissionTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
