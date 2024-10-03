import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./crewRoleFilter.de.translations.json";
import en from "./crewRoleFilter.en.translations.json";

const translations = { en, de };
export const useCrewRoleFilterTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
