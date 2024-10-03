import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./overviewGroup.de.translations.json";
import en from "./overviewGroup.en.translations.json";

const translations = { en, de };
export const useOverviewGroupTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
