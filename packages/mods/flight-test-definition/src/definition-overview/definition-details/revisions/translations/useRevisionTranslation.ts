import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./revision.de.translations.json";
import en from "./revision.en.translations.json";

const translations = { en, de };
export const useRevisionTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
