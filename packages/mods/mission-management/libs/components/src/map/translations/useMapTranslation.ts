import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./map.de.translations.json";
import en from "./map.en.translations.json";

const translations = { en, de };
export const useMapTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
