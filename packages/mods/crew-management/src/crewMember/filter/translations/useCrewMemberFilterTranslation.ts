import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./crewMemberFilter.de.translations.json";
import en from "./crewMemberFilter.en.translations.json";

const translations = { en, de };
export const useCrewMemberFilterTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
