import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./missionDetail.de.translations.json";
import en from "./missionDetail.en.translations.json";

const translations = { en, de };
export const useMissionDetailTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
