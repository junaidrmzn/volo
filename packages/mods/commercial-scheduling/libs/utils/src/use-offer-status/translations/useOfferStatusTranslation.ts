import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./OfferStatus.de.translations.json";
import en from "./OfferStatus.en.translations.json";

const translations = { en, de };
export const useOfferStatusTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
