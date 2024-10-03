import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./missionFilter.de.translations.json";
import en from "./missionFilter.en.translations.json";

const translations = { en, de };
export const useMissionFilterTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
