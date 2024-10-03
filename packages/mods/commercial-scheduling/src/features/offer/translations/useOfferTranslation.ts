import { VerifiedTranslations, useTranslation } from "@voloiq/i18n";
import de from "./Offer.de.translations.json";
import en from "./Offer.en.translations.json";

const translations = { de, en };

export const useOfferTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type OfferTranslationFunction = ReturnType<typeof useOfferTranslation>["t"];
