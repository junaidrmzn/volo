import { VerifiedTranslations, useTranslation } from "@voloiq/i18n";
import de from "./PromotionItem.de.translations.json";
import en from "./PromotionItem.en.translations.json";

const translations = { en, de };
export const usePromotionItemTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type PromotionItemTranslationFunction = ReturnType<typeof usePromotionItemTranslation>["t"];
