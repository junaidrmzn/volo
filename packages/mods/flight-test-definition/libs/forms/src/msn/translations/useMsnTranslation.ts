import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./msn.de.translations.json";
import en from "./msn.en.translations.json";

const translations = { en, de };
export const useMsnTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
