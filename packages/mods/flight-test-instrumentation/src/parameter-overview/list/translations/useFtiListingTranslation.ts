import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ftiListing.de.translations.json";
import en from "./ftiListing.en.translations.json";

const translations = { en, de };

export const useFtiListingTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
