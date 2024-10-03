import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./tolerancesSection.de.translations.json";
import en from "./tolerancesSection.en.translations.json";

const translations = { en, de };
export const useTolerancesSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
