import { VerifiedTranslations, useTranslation } from "@voloiq/i18n";
import de from "./Discount.de.translations.json";
import en from "./Discount.en.translations.json";

const translations = { en, de };
export const useDiscountTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type DiscountTranslationFunction = ReturnType<typeof useDiscountTranslation>["t"];
