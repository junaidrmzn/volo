import { VerifiedTranslations, useTranslation } from "@voloiq/i18n";
import de from "./promotion.de.translations.json";
import en from "./promotion.en.translations.json";

const translations = { en, de };
export const usePromotionTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type CommercialSchedulingTranslationFunction = ReturnType<typeof usePromotionTranslation>["t"];
