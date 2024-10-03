import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./PromotionStatus.de.translations.json";
import en from "./PromotionStatus.en.translations.json";

const translations = { en, de };
export const usePromotionStatusTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
