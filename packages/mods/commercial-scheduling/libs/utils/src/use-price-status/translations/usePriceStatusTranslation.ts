import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./PriceStatus.de.translations.json";
import en from "./PriceStatus.en.translations.json";

const translations = { en, de };
export const usePriceStatusTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
