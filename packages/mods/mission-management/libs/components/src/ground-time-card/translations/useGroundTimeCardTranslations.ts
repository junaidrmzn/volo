import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./groundTimeCard.de.translations.json";
import en from "./groundTimeCard.en.translations.json";

const translations = { en, de };
export const useGroundTimeCardTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
